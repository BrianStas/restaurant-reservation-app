import React from "react";
//TODO: needs call to api to handle changes
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import ReservationForm from "./reservationForm";

function EditReservation(){
// pulls reservation ID from params and uses it for the reservation being edited
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState({cards:[]})
    function fetchReservation() {
        readReservation(reservationId).then(data => setReservation(data));
      }
      useEffect(fetchReservation, []);

    return (
    <div>
        
        {/* first checks that the deck is loaded then sends the update call
        and the correct submit text with the formData filled out with the deck info */}
        {reservation.id &&
        <ReservationForm 
            onSubmit="THIS SHOULD BE THE API CALL"
            submitButtonText="Save"
            initialFormData={reservation}/>
        }
    </div>
    )
}

export default EditDeck;