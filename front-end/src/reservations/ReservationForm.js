import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { today } from "../utils/date-time";



function ReservationForm({initialFormData, onSubmit, submitButtonText}){
    // 3 props to handle the initial form and what happens on submit
    const history = useHistory();
    const [formData, setFormData]=useState(initialFormData)
    const [isFuture, setIsFuture] = useState(false);
    const [isTuesday, setIsTuesday] = useState(false);
    const [isFutureTime, setIsFutureTime] = useState(true);
// tracks the input as a user types to then use for submit

    function handleInput(event){
        if(event.target.name === "people"){
            setFormData({
                ...formData,
                [event.target.name]: Number(event.target.value)
            })
        }else{
            setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        }
    }

    function handleDate(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(checkIfFuture, [formData])
    useEffect(checkTuesday, [formData])
    useEffect(checkFutureTime, [formData])
// sends the form data to use onSubmit from EditReservation or NewReservation then pushes user to deckScreen
    
function handleSubmit(event){
    event.preventDefault();
    if(isFuture && !isTuesday && isFutureTime){
    onSubmit(formData)
    .then(data =>
        history.push(`/`))
    }
}

function checkIfFuture(){
    const givenDate = formData.reservation_date;
    setIsFuture(givenDate >= today());
}

function checkFutureTime(){
    const givenDate = formData.reservation_date;
    const givenTime = formData.reservation_time;
    if(givenDate === today()){
        const timeArray = givenTime.split(":");
        console.log("timeArray is: ", timeArray);
        const timeNumber = Number(timeArray.join(''));
        const currMin = new Date().getMinutes().toString();
        const currHour = new Date().getHours().toString();
        console.log("adding hours and mins is: ", Number(currHour + currMin));
        setIsFutureTime(timeNumber > Number(currHour + currMin))
    }
}

    function checkTuesday(){
        if(formData.reservation_date.length === 10){
        const givenDate = new Date(formData.reservation_date);
        const result = givenDate.getDay();
        setIsTuesday(result === 1)
        }}
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
            <label htmlFor="reservation_date">
                Date of Reservation
            </label>
            <input 
                type="date" 
                className="form-control"
                id="reservation_date" 
                name="reservation_date" 
                value={formData.reservation_date} 
                onChange={handleDate}
                required />
            </div>
            {isFuture ? <></> : <p className="alert alert-danger">Please select a future date</p>}
            {isTuesday ? <p className="alert alert-danger">Business is closed on Tuesdays</p> : <></>}
            <div className="form-group">
            <label htmlFor="reservation_time">
                Reservation Time
            </label>
            <input 
                type="time" 
                className="form-control"
                id="reservation_time" 
                name="reservation_time" 
                min="10:30" 
                max="21:30"
                onChange={handleInput}
                value={formData.reservation_time} 
                required />
            </div>
            {isFutureTime ? <></> : <p className="alert alert-danger">Please select a time in the future</p>}
            <div className="form-group">
            <label htmlFor="people">
                Party Size
            </label>
            <input 
                type="number" 
                className="form-control"
                id="people" 
                name="people" 
                // min="1"
                onChange={handleInput}
                value={formData.people}
                // placeholder="one"
                required  />
            </div>
            <button type="submit" className="btn btn-primary mr-3">{submitButtonText}</button>
            <button type="button" className="btn btn-secondary mr-3" onClick={()=>history.goBack()}>Cancel</button>
        </form>
    </div>)}

export default ReservationForm;