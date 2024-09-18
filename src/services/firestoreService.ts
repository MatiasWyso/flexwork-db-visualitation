import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

// Definir una interfaz para los datos de suscripción
interface Subscription {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  timestamp: Date;
}

// Obtener datos en tiempo real desde Firestore
export const subscribeToData = (callback: (data: Subscription[]) => void) => {
  // Crear una consulta que ordene por el campo "timestamp" en orden descendente
  const q = query(collection(db, "subscriptions"), orderBy("timestamp", "desc"));

  // Usar onSnapshot para escuchar los cambios en tiempo real
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data: Subscription[] = [];
    
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        name: docData.name,
        lastname: docData.lastname,
        email: docData.email,
        phone: docData.phone,
        timestamp: docData.timestamp.toDate(), // Asegúrate de convertirlo a Date
      } as Subscription);
    });

    // Llamar al callback con los datos actualizados
    callback(data);
  });

  // Devuelve la función para detener la suscripción
  return unsubscribe;
};
