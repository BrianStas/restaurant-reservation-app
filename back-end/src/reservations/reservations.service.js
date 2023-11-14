const knex = require("../db/connection");

function create(reservation){

}

function update(updatedReservation){
    return knex("reservations")     
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id})
      .update(updatedRestervation, "*")
  }

  module.exports = {
    create,
    update,
  };