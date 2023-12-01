import React from "react";
//TODO: needs call to api to handle changes
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import ReservationForm from "./reservationForm";
import { readReservation, updateReservationStatus } from "../utils/api";

function EditReservation(){
// pulls reservation ID from params and uses it for the reservation being edited
    const history = useHistory();
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState({cards:[]})
    function fetchReservation() {
        readReservation(reservationId).then(data => setReservation(data));
      }
      useEffect(fetchReservation, [reservationId])
      console.log(reservation);

      function submitHandler(data){
        updateReservationStatus(data);
        history.push(`/dashboard?date=${data.reservation_date}`)
    }

    return (
    <div>        
        {/* first checks that the reservation is loaded then sends the update call
        and the correct submit text with the formData filled out with the reservation info */}
        {reservation.reservation_id &&
        <ReservationForm 
            onSubmit={submitHandler}
            submitButtonText="Save"
            initialFormData={reservation}/>
        }
    </div>
    )
}

export default EditReservation;