import React from "react";
import TableForm from "./tableForm";
import { createTable } from "../utils/api";

function NewTable(){

    return(
    <div>
        {/* calls the form with blank fields and then uses the createTable API call on submit */}
        <TableForm 
            onSubmit={createTable}
            submitButtonText="Submit"
             initialFormData={ {
            table_name: '',            
            people: 1,
            } }/>
    </div>
    )}

export default NewTable;