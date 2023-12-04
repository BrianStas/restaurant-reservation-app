import React from "react";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function NewReservation(){
    const history = useHistory();
    function submitHandler(data){
        createReservation(data);
        history.push(`/dashboard?date=${data.reservation_date}`)
    }

    return(
    <div>
        {/* calls the form with blank fields and then uses the createReservation API call on submit */}
        <ReservationForm 
            onSubmit={submitHandler}
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