import React from "react";
import ReservationForm from "./reservationForm";
import { createReservation } from "../utils/api";

function NewReservation(){

    return(
    <div>
        {/* calls the form with blank fields and then uses the createReservation API call on submit */}
        <ReservationForm 
            onSubmit={createReservation}
            submitButtonText="Submit"
             initialFormData={ {
            first_name: '',
            last_name: '',
            mobile_number: '',
            people: 1,
            reservation_date: '',
            reservation_time: '',
            status: "booked"
            } }/>
    </div>
    )}

export default NewReservation;