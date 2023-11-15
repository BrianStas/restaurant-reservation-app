import React from 'react'
import { deleteReservation } from '../utils/api';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';



function ReservationDisplay({selectedReservation}){
    const history = useHistory();
    const reservationDeleteHandler = ()=>{if(window.confirm("Delete this reservation?\n You will not be able to recover it")){
        deleteReservation(selectedReservation.reservation_id)
        .then((res)=> history.push('/') )
    }}

    return(
        <div className="col">
            <div className="card w-30">
                <div className="card-header">
                    {`${selectedReservation.first_name} ${selectedReservation.last_name}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Party of {selectedReservation.people}</h5>
                    <p className="card-text">{selectedReservation.reservation_date}</p>
                    <p className="card-text">{selectedReservation.reservation_time}</p>
                    <button type="button" className="btn btn-danger float-right ml-2" onClick={reservationDeleteHandler}>Delete</button>
                    <Link to={`/reservations/${selectedReservation.reservation_id}/edit`} class= "btn btn-secondary float-right">Edit</Link>
                </div>
            </div>
        </div>
    )
}

export default ReservationDisplay;