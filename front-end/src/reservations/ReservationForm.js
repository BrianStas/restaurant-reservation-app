import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";



function ReservationForm({initialFormData, onSubmit, submitButtonText}){
    // 3 props to handle the initial form and what happens on submit
    const history = useHistory();
    const [formData, setFormData]=useState(initialFormData)
    const [errorList, setErrorList] = useState(null);
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

    function validate(reservation){
        console.log("form validate reservation is: ", reservation)
        const errors = [];

        function checkIfFuture({reservation_date, reservation_time}){
            const reservationDate = new Date(`${reservation_date}T${reservation_time}`);
          if (reservationDate < new Date()) {
              errors.push(new Error("Please select a future date"));
          }
        }

        function checkTuesday({reservation_date}){
            if(reservation_date.length === 10){
            const givenDay = new Date(reservation_date).getUTCDay;
            if(givenDay===2){
                errors.push(new Error("Business is closed on Tuesdays"));
            }
            }
        }

        function checkWorkingHours(){
            const selectedDate = new Date(formData.reservation_date);
            const selectedHours = formData.reservation_time.split(':')
            selectedDate.setHours(selectedHours[0], selectedHours[1], 0);
            const openingTime = new Date(selectedDate);
            console.log("selectedDate is: ", selectedDate)
            openingTime.setHours(10, 30, 0); // Set opening Time to 10:30 AM
    
            const closingTime = new Date(selectedDate);
            closingTime.setHours(21, 30, 0); // Set closing Time to 9:30 PM
    
            if(selectedDate < openingTime || selectedDate >= closingTime){
                errors.push(new Error("Please select a time within working hours of 10:30AM to 9:30PM"))
            };           
        }

        checkIfFuture(reservation);
        checkTuesday(reservation);
        checkWorkingHours(reservation);
        console.log("validate errors is: ", errors)
        return errors;
    }
// sends the form data to use onSubmit from EditReservation or NewReservation then pushes user to deckScreen
    
function handleSubmit(event){

    event.preventDefault();
    const reservationErrors = validate(formData);  
    console.log("handle submit reservation Errors is: ", reservationErrors)  
        if (reservationErrors.length) {
            setErrorList(reservationErrors);
          return errorList;
        }
    onSubmit(formData)
    
    history.push(`/dashboard?date=${formData.reservation_date}`)
    .catch(setErrorList)
        
}



// function checkFutureTime(){
//     const givenDate = formData.reservation_date;
//     const givenTime = formData.reservation_time;
//     if(givenDate === today()){
//         const timeArray = givenTime.split(":");
//         console.log("timeArray is: ", timeArray);
//         const timeNumber = Number(timeArray.join(''));
//         const currMin = new Date().getMinutes().toString();
//         const currHour = new Date().getHours().toString();
//         console.log("adding hours and mins is: ", Number(currHour + currMin));
//         setIsFutureTime(timeNumber > Number(currHour + currMin))
//     }
// }

    
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
            {/* {isFuture ? <></> : <p className="alert alert-danger">Please select a future date</p>}
            {isTuesday ? <p className="alert alert-danger">Business is closed on Tuesdays</p> : <></>} */}
            <div className="form-group">
            <label htmlFor="reservation_time">
                Reservation Time
            </label>
            <input 
                type="time" 
                className="form-control"
                id="reservation_time" 
                name="reservation_time" 
                // min="10:30" 
                // max="21:30"
                onChange={handleInput}
                value={formData.reservation_time} 
                required />
            </div>
            {/* {isFutureTime ? <></> : <p className="alert alert-danger">Please select a time in the future</p>}
            {isWorkingHours ? <></> : <p className="alert alert-danger">Please select a time within working hours of 10:30AM to 9:30PM</p>} */}
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
            {errorList && errorList.map((error, index)=><ErrorAlert error = {error} key = {index}/>)}
        </form>
    </div>)}

export default ReservationForm;