// firestoreService.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Ensure you import your Firestore instance

export async function addDocument(collectionName, documentId, data) {
  try {
    await setDoc(doc(db, collectionName, documentId), data);
    console.log("Document written successfully!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}
