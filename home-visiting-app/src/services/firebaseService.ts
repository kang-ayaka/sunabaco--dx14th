import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig'; // Adjusted path

// Define the Visit interface (can be shared or imported from CalendarPage if structured so)
export interface Visit {
  id: string;
  facilityName: string;
  doctor: string;
  patientCount: number;
  desiredTime: string;
  notes: string;
  contactPerson: string;
  contactPhone: string;
  pharmacy: string;
  // Add any other fields that are stored in Firestore
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Function to fetch visits
export const getVisits = async (): Promise<Visit[]> => {
  if (!firebaseConfig.projectId) {
    console.error("Firebase Project ID is not configured. Cannot fetch visits.");
    return []; // Return empty array or throw error
  }
  try {
    const visitsCollection = collection(db, 'visits');
    const visitSnapshot = await getDocs(visitsCollection);
    const visitList = visitSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        facilityName: data.facilityName || '',
        doctor: data.doctor || '',
        patientCount: data.patientCount || 0,
        desiredTime: data.desiredTime || '',
        notes: data.notes || '',
        contactPerson: data.contactPerson || '',
        contactPhone: data.contactPhone || '',
        pharmacy: data.pharmacy || '',
      } as Visit; // Type assertion
    });
    return visitList;
  } catch (error) {
    console.error("Error fetching visits from Firestore:", error);
    // Depending on requirements, you might want to throw the error
    // or return an empty list / specific error object.
    return [];
  }
};

export default db; // Exporting db if other direct operations are needed elsewhere
