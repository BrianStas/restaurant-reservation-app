import React, { useState } from 'react'

function TableDisplay({selectedTable}){

    const finishHandler = ()=>{if(window.confirm("Is this table ready to seat new guests? \n This cannot be undone.")){

        }
    }

    return(
        <div className="col">
            <div className="card w-30">
                <div className="card-header">
                    {`${selectedTable.table_name}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{selectedTable.capacity}</h5>
                    <h5 className="card-text" data-table-id-status={selectedTable.table_id}>{selectedTable.reservation_id ? "Occupied" : "Free"}</h5>
                    {selectedTable.reservation_id ? <button data-table-id-finish={table.table_id} onClick={finishHandler}>Finish</button> : <></>}
                </div>
            </div>
        </div>
    )
}


export default TableDisplay;