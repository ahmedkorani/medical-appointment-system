import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const saveEventToFirestore = async (event) => {
  console.log(event);
  const documentObject = {
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
  };
  try {
    await setDoc(doc(db, "events", documentObject.id), documentObject);
    console.log("Event successfully written!");
    return true;
  } catch (error) {
    console.error("Error writing event: ", error);
    return false;
  }
};
