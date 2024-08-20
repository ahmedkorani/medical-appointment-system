import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);
    console.log(`Event with ID ${eventId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting event: ", error);
  }
};
