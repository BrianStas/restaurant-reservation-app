const methodNotAllowed = require("../errors/methodNotAllowed"); 
const router = require("express").Router();
const controller = require("./tables.controller");

router 
    .route("/:tableId")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed);

router
    .route("/:reservationId")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);


module.exports = router;