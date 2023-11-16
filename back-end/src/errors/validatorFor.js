const validator = require('validator');

function validatorFor(property) {
    return function (req, res, next){
    if(property == "reservation_date"){
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        dateRegex.test(req.body.data[property]) ? next() : res.status(400).send({ error: 'reservation_date should be in correct format' })
    }
    if(property == "reservation_time"){
        validator.isTime(req.body.data[property]) ? next() : res.status(400).send({ error: 'reservation_time should be in correct format' })
    }
    if(property == "people"){
        typeof req.body.data[property] == 'number' ? next() : next({status: 400, message: 'people field must be a number'})
    }
}
}

module.exports = validatorFor;