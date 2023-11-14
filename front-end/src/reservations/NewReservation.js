import React from "react";
import ReservationForm from "./ReservationForm";
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
            reservation_date: '',
            reservation_time: '',
            } }/>
    </div>
    )}

export default NewReservation;