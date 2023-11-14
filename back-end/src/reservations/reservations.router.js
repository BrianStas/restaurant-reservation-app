/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const methodNotAllowed = require("../errors/methodNotAllowed"); 
const router = require("express").Router();
const controller = require("./reservations.controller");

router
    .route("/new")
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:reservationId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);


router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;
