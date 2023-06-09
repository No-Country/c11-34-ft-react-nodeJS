import { useEffect, useState } from "react";
import { NavBarUI } from "../components/NavBarUI";
import { useUser } from "../hooks";
import { Link } from "react-router-dom";
import Trash from "../assets/icons8-basura.svg";
import Pencil from "../assets/pencil-svgrepo-com.svg";
import clock from "../assets/clock.svg";
import userIcon from "../assets/user.svg";

import {
  deleteReservation,
  editReservation,
  getRestaurant,
  listReservation,
} from "../services";

export function MyReserves({}) {
  const [listReservations, setListReservations] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [idRestaurants, setIdRestaurants] = useState([]);
  const [selectedHour, setSelectedHour] = useState("0");
  const [selectedDiners, setSelectedDiners] = useState(null);

  const { user, load } = useUser();
  const email = user.correo;

  useEffect(() => {
    listReservation(email)
      .then((res) => {
        setListReservations(res.reservas);
        const ids = res.reservas.map((reserva) => reserva.id_restaurante);
        setIdRestaurants(ids);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email]);

  useEffect(() => {
    idRestaurants.forEach((id) => {
      getRestaurant(id)
        .then((res) => {
          setRestaurants((prevRestaurants) => ({
            ...prevRestaurants,
            [id]: res,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [idRestaurants]);

  const handleFindRestaurant = (id) => {
    return restaurants[id] || {};
  };

  const dataReservationEdit = JSON.parse(localStorage.getItem("editReservation"));
  const customers = dataReservationEdit?.personas || [];
  const availableShifts = dataReservationEdit?.turnos || [];
  console.log(dataReservationEdit);

  const handleDelete = (id) => {
    console.log(id);
    try {
      deleteReservation(id)
        .then((res) => {
          setListReservations((prevReservations) =>
            prevReservations.filter((reserva) => reserva._id !== id)
          );
          console.log(res.message);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (id) => {
    setShowCalendar(true);
  };

  const handleCloseModal = () => {
    setShowCalendar(false);
  };
  const formatHour = (hour) => {
    return hour.toString().padStart(2, "0");
  };
  const handleDiners = (e) => {
    setSelectedDiners(e.target.value);
  };

  const handleHour = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedHour(selectedIndex.toString());
  };

  const handleEdit = (id) => {
    handleOpenModal();
    console.log(id);
    const data = {
      hora: selectedHour,
      comensales: selectedDiners,
    };
    try {
      editReservation(id, data).then((res) => res.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBarUI />
      <main className="font-inter px-10 lg:px-40 py-6 pb-20 lg:pb-6">
        <h2 className="text-3xl font-medium text-black font-montserrat mb-2">
          {user.nombre}{" "}
          <span className="text-black-light">estos son tus reservas</span>
        </h2>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <div className="grid grid-cols-2 border-2 rounded-lg w-48 h-72 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listReservations.map((reserv, index) => {
              const restaurant = handleFindRestaurant(reserv.id_restaurante);
              return (
                <div
                  key={index}
                  className={
                    "w-48 h-72 mx-auto flex flex-col py-5 items-center"
                  }
                >
                  <div>
                    <img
                      className={"w-28"}
                      src={restaurant.imagenes}
                      alt={restaurant.nombre}
                    />
                  </div>
                  <div className="text-xl font-bold">{reserv.nombre}</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row text-base font-medium">
                      <h3 className="text-base font-bold">Fecha: </h3>
                      {reserv.fecha}
                    </div>
                    <div className="flex flex-row text-base font-medium">
                      <h3 className="text-base font-bold">Personas: </h3>{" "}
                      {reserv.comensales}
                    </div>
                    <div className="flex flex-row text-base font-medium">
                      <h3 className="text-base font-bold">Hora:</h3>{" "}
                      {reserv.hora}
                    </div>
                    <div className={"flex"}>
                      <button
                        className="w-5 h-5"
                        onClick={() => handleDelete(reserv._id)}
                      >
                        <img src={Trash} alt="trash" />
                      </button>
                      {/* <button
                        className="w-5 h-5"
                        onClick={() => handleOpenModal(reserv._id)}
                      >
                        <img src={Pencil} alt="pencil" />
                      </button> */}
                    </div>
                    {/* {showCalendar && (
                      <div className="bg-gray-300">
                        <div
                          className={
                            "flex flex row  justify-between py-2 px-1 static"
                          }
                          onClick={handleCloseModal}
                        >
                          <img
                            src={clock}
                            alt="clock"
                            width={20}
                            height={20}
                            className="left-2"
                          />
                          <select
                            value={selectedHour || ""}
                            onChange={handleHour}
                            className={"p-2 rounded"}
                          >
                            {availableShifts.map((hora, index) => (
                              <option key={index} value={index.toString()}>
                                {formatHour(hora)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          className={
                            "flex flex row justify-between py-2 px-2 static"
                          }
                        >
                          <img
                            src={userIcon}
                            alt="user"
                            width={20}
                            height={20}
                            className="left-2"
                          />
                          <select
                            value={selectedDiners}
                            onChange={handleDiners}
                            className="p-2.5 rounded"
                          >
                            <option value="">0</option>
                            {Array.from({ length: customers }).map(
                              (_, index) => (
                                <option key={index} value={index.toString()}>
                                  {index}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          className="whitespace-nowrap w-full h-12 text-center text-sm flex justify-center items-center rounded-full bg-bg-dark text-letter-color"
                          onClick={handleEdit}
                        >
                          Actualizar
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
