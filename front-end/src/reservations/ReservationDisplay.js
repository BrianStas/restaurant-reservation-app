import React from 'react'



function ReservationDisplay({selectedReservation}){
    return(
        <div className="card">
        <div className="card-header">
            {`${selectedReservation.first_name} ${selectedReservation.last_name}`}
        </div>
        <div className="card-body">
            <h5 className="card-title">Party of {selectedReservation.people}</h5>
            <p className="card-text">{selectedReservation.reservation_date}</p>
            <p className="card-text">{selectedReservation.reservation_time}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    )
}

export default ReservationDisplay;