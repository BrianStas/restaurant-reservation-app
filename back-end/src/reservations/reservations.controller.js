const reservationsService = require("./reservations.service");
async function list(req, res) {
  const data = await reservationsService.list();
  res.json({ data });
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
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedReservation);
  res.json({ data });
}

function destroy(req, res, next) {
  reservationsService
    .delete(res.locals.reservation.reservation_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function reservationExists(req, res, next) {
  reservationsService
    .read(req.params.reservationId)
    .then((reservation) => {
      if (reservation) {
        res.locals.reservation = reservation;
        return next();
      }
      next({ status: 404, message: `Reservation cannot be found.` });
    })
    .catch(next);
}

module.exports = {
  list,
  read: [reservationExists, read],
  create,
  update: [reservationExists, update],
  delete: [reservationExists, destroy],
};
