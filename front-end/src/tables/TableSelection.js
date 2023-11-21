import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { listOpenTables, readReservation, updateTable } from "../utils/api";

function TableSelection() {
  const history = useHistory();
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState({})
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    
    function fetchReservation() {
        readReservation(reservationId).then(data => setReservation(data));
        console.log("issue in fetch Reservation");
      }
      useEffect(fetchReservation, [reservationId])

    function fetchTables() {
        listOpenTables().then(data=>setTables(data));
        console.log("issue in fetch Tables");
    }
    useEffect(fetchTables, [reservationId])

    const handleChange = ({ target }) => {
      setSelectedTable(target.value);
      console.log(selectedTable);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("selected table: ", tables[selectedTable], "reservation: ", reservation)
      if(tables[selectedTable] && tables[selectedTable].capacity >= reservation.people){
      updateTable(reservationId, selectedTable)
        .then((data) => history.push("/"))
      }
    };

  return (
    <div className="w-100">  
      <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="table_name">
              Select Table for Reservation
          </label>
          
            {tables.map((table)=>{return(<div key={table.table_id}>
                <input 
                  type="radio" 
                  id={table.table_name}  
                  name="table_id" 
                  value={table.table_id}
                  onChange={handleChange} />
                <label htmlFor={table.table_name}>{table.table_name} - {table.capacity}</label>
              </div>)})}  

          </div>
          <button type="submit" className="btn btn-primary mr-3" >Submit</button>
          <button type="button" className="btn btn-secondary mr-3" onClick={()=>history.goBack()}>Cancel</button>
        </form>
    </div>
  )
}

export default TableSelection