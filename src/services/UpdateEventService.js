import { updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const updateEvent = async (eventId, updatedEvent) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, updatedEvent);
    console.log(`Event with ID ${eventId} has been updated.`);
  } catch (error) {
    console.error("Error deleting event: ", error);
  }
};
