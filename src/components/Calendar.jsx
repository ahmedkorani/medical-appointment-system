import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { v4 as uuid } from "uuid";
import { saveEventToFirestore } from "../services/CreateEventService";
import { fetchEventsFromFirestore } from "../services/FetchEventService";
import { deleteEvent } from "../services/DeleteEventService";
import { AppContext } from "../store/AppProvider";
import { updateEvent } from "../services/UpdateEventService";

export const CalendarComponent = () => {
  // TODO add fix here https://github.com/fullcalendar/fullcalendar/issues/4499
  // Document will contain events with Unique id to avoid rendering duplicate events
  const [eventsDocument, setEventsDocument] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const { isPatientView } = useContext(AppContext);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const events = await fetchEventsFromFirestore();
      events.forEach((event) => {
        setEventsDocument((prevEvents) => ({
          ...prevEvents, // Spread the previous state
          [event.id]: event, // Add the new event
        }));
      });

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  function getEventsList() {
    const eventsList = [];
    Object.values(eventsDocument).forEach((event) => {
      eventsList.push(event);
    });

    return eventsList;
  }

  async function handleClickPatient(clickInfo) {
    const confirmed = confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    );

    if (confirmed) {
      try {
        setIsLoading(true);
        await deleteEvent(clickInfo.event.id);
        setEventsDocument((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          delete updatedEvents[clickInfo.event.id]; // Remove the event with the specified ID
          return updatedEvents;
        });
        clickInfo.event.remove();
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert("Something went wrong. Please try again later");
      }
    }
  }

  async function handleClickClinic(clickInfo) {
    // TODO add dialog to confirm
    const confirmed = confirm(
      `Do you want to accept this appointment? '${clickInfo.event.title}'`
    );

    try {
      setIsLoading(true);
      let newEvent = eventsDocument[clickInfo.event.id];
      console.log(clickInfo.event);
      newEvent["backgroundColor"] = confirmed ? "green" : "red";
      setEventsDocument((prevState) => ({
        ...prevState,
        [clickInfo.event.id]: {
          ...prevState[clickInfo.event.id],
          ...newEvent,
        },
      }));
      await updateEvent(clickInfo.event.id, newEvent);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again later");
    }
  }

  async function handleEventClick(clickInfo) {
    if (isPatientView) {
      await handleClickPatient(clickInfo);
    } else {
      await handleClickClinic(clickInfo);
    }
  }

  function isDateInPast(date) {
    const selectedDate = new Date(date.startStr).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return selectedDate < today ? true : false;
  }

  async function handleDateSelect(selectInfo) {
    let calendarApi = selectInfo.view.calendar;

    if (!isPatientView) {
      alert("You can't schedule appointments in the clinic view");
      calendarApi.unselect();
      return;
    }

    if (isDateInPast(selectInfo)) {
      alert("You can't book events in the past");
      calendarApi.unselect();
      return;
    }

    let title = prompt("Please enter a new title for your event");
    calendarApi.unselect();

    if (!title) return;

    setIsLoading(true);

    const eventObject = {
      id: uuid(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    };

    const result = await saveEventToFirestore(eventObject);

    if (!result) {
      setIsLoading(false);
      alert("Something went wrong. Please try again later");
      return;
    }

    if (title) {
      calendarApi.addEvent(eventObject);
      setEventsDocument((prevEvents) => ({
        ...prevEvents,
        [eventObject.id]: eventObject,
      }));
    }
    setIsLoading(false);
  }

  return (
    <div style={{ marginLeft: "4rem", marginRight: "4rem", height: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <FullCalendar
        events={getEventsList()}
        height={"100%"}
        select={handleDateSelect}
        eventClick={handleEventClick}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
    </div>
  );
};
