const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const validatorFor = require("../errors/validatorFor");
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const {date} = req.query;
  console.log(date);
  if(date){
    const data = await reservationsService.filteredList(date);
    res.json({data});

  }else{
  const data = await reservationsService.list();
  res.json({ data });
  }
}

async function create(req, res) {
  
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });

}

async function update(req, res) {
  if(res.locals.reservation.status === "finished"){
    return res.status(400).send({error: `${res.locals.reservation.status} reservation can not be updated`}) 
  }
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const result = await reservationsService.update(updatedReservation);
  const data = result[0];
  res.status(200).json({ data });
}

async function destroy(req, res) {
  const { reservation } = res.locals;
  await reservationsService.delete(reservation.reservation_id);
  res.sendStatus(204);
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${req.params.reservationId} cannot be found.` });
}

const VALID_PROPERTIES = [
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasOnlyValidProperties(req, res, next) {
  if(!req.body.data)
  {res.status(400).send({error: "data is missing!"})}
  const {data} = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasStatusProperty = hasProperties("status");

const hasRequiredProperties = hasProperties(
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people",
  "status");
  
  const VALID_STATUS = [
    "booked",
    "seated",
    "finished",
  ]

  function hasValidStatus(req, res, next){
    if(!req.body.data)
  {res.status(400).send({error: "data is missing!"})}
  const {data} = req.body;

  const invalidFields = Object.values(data).filter(
    (field) => !VALID_STATUS.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid status: ${invalidFields.join(", ")}`,
    });
  }
  next();
  }

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [hasOnlyValidProperties, 
    hasRequiredProperties, 
    validatorFor("reservation_date"),
    validatorFor("reservation_time"),
    validatorFor("people"),
    validatorFor("status"),
    create],
  update: [asyncErrorBoundary(reservationExists), hasStatusProperty, hasValidStatus, update],
  delete: [asyncErrorBoundary(reservationExists), destroy],
};
