import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const CalendarComponent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function isDateInPast(date) {
    const selectedDate = new Date(date.startStr).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return selectedDate < today ? true : false;
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (isDateInPast(selectInfo)) {
      // TODO implement past events pop up
      return;
    }

    let dt = new Date();

    if (title) {
      calendarApi.addEvent({
        id: selectInfo.startStr.toString() + "test",
        title,
        start: new Date().getTime(),
        end: new Date(dt.getTime() + 30 * 60 * 1000),
        backgroundColor: "#378006",
      });
    }
  }

  return (
    <FullCalendar
      height={"100%"}
      select={handleDateSelect}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
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
  );
};
