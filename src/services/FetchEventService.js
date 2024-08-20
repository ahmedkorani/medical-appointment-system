import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const fetchEventsFromFirestore = async () => {
  try {
    // Reference the 'events' collection
    const eventsCollectionRef = collection(db, "events");

    // Fetch all documents from the collection
    const eventsSnapshot = await getDocs(eventsCollectionRef);

    // Map through the documents and retrieve data
    const eventsList = eventsSnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Spread the document data
    }));

    // Return the list of events
    return eventsList;
  } catch (error) {
    console.error("Error retrieving events: ", error.message);
    return []; // Return an empty array if there's an error
  }
};
