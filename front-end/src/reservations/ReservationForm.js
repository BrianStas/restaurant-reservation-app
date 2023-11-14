import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function ReservationForm({initialFormData, onSubmit, submitButtonText}){
    // 3 props to handle the initial form and what happens on submit
    const history = useHistory();
    const [formData, setFormData]=useState(initialFormData)
// tracks the input as a user types to then use for submit
    function handleInput(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
// sends the form data to use onSubmit from EditReservation or NewReservation then pushes user to deckScreen
    function handleSubmit(event){
        event.preventDefault();
        onSubmit(formData)
        .then(data =>
            history.push(`#`))
        }
/* returns form for the following fields: 
first name, last name, mobile number, reservation time, and reservation date.
Will be called for the new reservation and the reservation edits.*/
    return (
    <div class="w-100">
        
        <form onSubmit={handleSubmit}>
            <div class="form-group">
            <label htmlFor="first_name">
                First Name
            </label>
            <input 
                type="text" 
                class="form-control" 
                id="first_name" 
                name="first_name" 
                onChange={handleInput}
                value={formData.firstName}
                placeholder="First Name" />
            </div>
            <div class="form-group">
            <label htmlFor="last_name">
                Last Name
            </label>
            <input 
                type="text" 
                class="form-control" 
                id="last_name" 
                name="last_name" 
                onChange={handleInput}
                value={formData.lastName}
                placeholder="Last Name" />
            </div>
            <div class="form-group">
            <label htmlFor="mobile_number">
                Mobile Number
            </label>
            <input 
                type="tel" 
                id="mobile_number"
                name="mobile_number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                onChange={handleInput}
                value={formData.mobileNumber}
                required />
            </div>
            <div>
            <label for="reservation_date">
                Date of Reservation
            </label>
            <input 
                type="date" 
                id="reservation_date" 
                name="reservation_date" 
                value={formData.reservationDate} 
                min="2024-01-01" 
                max="2024-12-31"
                onChange={handleInput}
                required />
            </div>
            <div>
            <label for="reservation_time">
                Reservation Time
            </label>
            <input 
                type="time" 
                id="reservation_time" 
                name="reservation_time" 
                min="05:00" 
                max="22:00"
                onChange={handleInput}
                value={formData.reservationTime} 
                required />
            </div>
            <div>
            <label for="party_size">
                Party Size
            </label>
            <input 
                type="number" 
                id="party_size" 
                name="party_size" 
                min="1"
                onChange={handleInput}
                value={formData.partySize}
                required  />
            </div>
            <button type="submit">{submitButtonText}</button>
        </form>
    </div>)}

export default ReservationForm;