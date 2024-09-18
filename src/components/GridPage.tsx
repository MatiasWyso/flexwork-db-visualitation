import React, { useEffect, useState } from "react";
import { getDataFromFirestore } from "../services/firestoreService";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "./GridPage.css";
import Boton from "./Boton/Boton";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

interface Subscription {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  timestamp: Date;
}

const GridPage: React.FC = () => {
  const [data, setData] = useState<Subscription[]>([]);
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Subscription | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDataFromFirestore();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Cambiar estado de carga una vez se haya completado la obtención de datos
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = () => {
    setShowList(!showList);
    if (showList) {
      setSelectedItem(null);
      setSelectedIndex(null);
    }
  };

  const handleNameClick = (item: Subscription, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid-page">
      <div className="card">
        <div className="title">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#6f32be"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M16 19h6" />
              <path d="M19 16v6" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            </svg>
          </span>
          <p className="title-text">Suscriptores</p>
        </div>
        <div className="data">
          <p>{data.length}</p>
        </div>
        <div className="grid-header">
          <Boton onClick={handleButtonClick} />
          {showList && (
            <div className="name-list">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className={`name-item ${selectedIndex === index ? "selected" : ""}`}
                  onClick={() => handleNameClick(item, index)}
                >
                  <span className="item-index">{data.length - index}</span> {item.name} {item.lastname}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showList && selectedItem && (
        <div className="details-card">
          <div className="details-header">
            <h1 className="details-title">Detalles de la Suscripción #{selectedIndex !== null ? data.length - selectedIndex : ""}</h1>
            <p className="details-text">
              <strong>Nombre:</strong> {selectedItem.name} {selectedItem.lastname}
            </p>
            <p className="details-text">
              <strong>Email:</strong> {selectedItem.email}
            </p>
            <p className="details-text">
              <strong>Teléfono:</strong> {selectedItem.phone}
            </p>
            <p className="details-text">
              <strong>Fecha:</strong>{" "}
              {format(selectedItem.timestamp, "d 'de' MMMM 'de' yyyy, h:mm:ss a 'UTC'XXX", { locale: es })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridPage;
