import React from 'react'

function TableDisplay({selectedTable}){

    return(
        <div className="col">
            <div className="card w-30">
                <div className="card-header">
                    {`${selectedTable.table_name}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{selectedTable.capacity}</h5>
                </div>
            </div>
        </div>
    )
}

export default TableDisplay;