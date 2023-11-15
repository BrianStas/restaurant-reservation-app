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
            history.push(`/`))
        }
/* returns form for the following fields: 
first name, last name, mobile number, reservation time, and reservation date.
Will be called for the new reservation and the reservation edits.*/
    return (
    <div className="w-100">
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="first_name">
                First Name
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="first_name" 
                name="first_name" 
                onChange={handleInput}
                value={formData.first_name}
                placeholder="First Name" />
            </div>
            <div className="form-group">
            <label htmlFor="last_name">
                Last Name
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="last_name" 
                name="last_name" 
                onChange={handleInput}
                value={formData.last_name}
                placeholder="Last Name" />
            </div>
            <div className="form-group">
            <label htmlFor="mobile_number">
                Mobile Number
            </label>
            <input 
                type="tel" 
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                onChange={handleInput}
                value={formData.mobile_number}
                required />
            </div>
            <div className="form-group">
            <label for="reservation_date">
                Date of Reservation
            </label>
            <input 
                type="date" 
                className="form-control"
                id="reservation_date" 
                name="reservation_date" 
                value={formData.reservation_date} 
                min="2023-11-01" 
                max="2024-12-31"
                onChange={handleInput}
                required />
            </div>
            <div className="form-group">
            <label for="reservation_time">
                Reservation Time
            </label>
            <input 
                type="time" 
                className="form-control"
                id="reservation_time" 
                name="reservation_time" 
                min="05:00" 
                max="22:00"
                onChange={handleInput}
                value={formData.reservation_time} 
                required />
            </div>
            <div className="form-group">
            <label for="people">
                Party Size
            </label>
            <input 
                type="number" 
                className="form-control"
                id="people" 
                name="people" 
                min="1"
                onChange={handleInput}
                value={formData.people}
                placeholder="1"
                required  />
            </div>
            <button type="submit">{submitButtonText}</button>
        </form>
    </div>)}

export default ReservationForm;