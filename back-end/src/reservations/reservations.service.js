const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function create(reservation){
  console.log("calling create service");
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords)=> createdRecords[0]);
}

function read(reservationId) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId }).first();
  }

function update(updatedReservation){
    return knex("reservations")     
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id})
      .update(updatedRestervation, "*")
  }

function destroy(reservation_id) {
    return knex("reservations").where({ reservation_id }).del(); 
  }

  module.exports = {
    list,
    create,
    read,
    update,
    delete: destroy,
  };