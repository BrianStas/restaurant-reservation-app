import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDisplay from "../reservations/ReservationDisplay";
import { next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);
  date = currentDate;

  useEffect(loadDashboard, [date, currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({date}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      console.log("currentDate variable: ", currentDate)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className = "row row-cols-1 row-cols-md-3">
      {reservations.map((reservation) => {return <ReservationDisplay selectedReservation = {reservation} key = {reservation.reservation_id}/>})}
      </div>
      <button onClick={()=>setCurrentDate(previous(currentDate))}>Previous Day</button>
      <button onClick={()=>setCurrentDate(next(currentDate))}>Next Day</button>
    </main>
  );
}

export default Dashboard;
