import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Definir una interfaz para los datos de suscripción
interface Subscription {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  timestamp: Date; // Cambiado a Date
}

// Obtener datos de Firestore
export const getDataFromFirestore = async (): Promise<Subscription[]> => {
  // Crear una consulta que ordene por el campo "timestamp" en orden descendente
  const q = query(collection(db, "subscriptions"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const data: Subscription[] = [];
  
  querySnapshot.forEach((doc) => {
    // Convertir el timestamp a un objeto Date
    const docData = doc.data();
    data.push({
      id: doc.id,
      name: docData.name,
      lastname: docData.lastname,
      email: docData.email,
      phone: docData.phone,
      timestamp: docData.timestamp.toDate() // Asegúrate de convertirlo a Date
    } as Subscription);
  });
  
  return data;
};