import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { readReservation } from "../utils/api";

function TableSelection() {
    const {reservationId} = useParams;
    const [reservation, setReservation] = useState({cards:[]})
    const [tables, setTables] = useState([]);
    
    function fetchReservation() {
        readReservation(reservationId).then(data => setReservation(data));
      }
      useEffect(fetchReservation, [reservationId])

    function fetchTables() {
        
    }

  return (
    <div>TableSelection</div>
  )
}

export default TableSelection