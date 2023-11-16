const validator = require('validator');

function validatorFor(property) {
    return function (req, res, next){
    if(property == "reservation_date"){
        const today = new Date();
        const givenDate = new Date(req.body.data[property]);
        if(givenDate < today){
            res.status(400).send({ error: 'reservation_date must be a future date'});
        }
        const dayOfGivenDate = givenDate.getDay();
        if(dayOfGivenDate === 1){
            res.status(400).send({ error: 'reservation_date can not be a Tuesday'});
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        dateRegex.test(req.body.data[property]) ? next() : res.status(400).send({ error: 'reservation_date should be in correct format' })
    }

    if(property == "reservation_time"){
        const reservationTime = req.body.data[property]
        if(validator.isTime(reservationTime)){
            const timeArray = reservationTime.split(":");
            console.log("timeArray is: ", timeArray);
            const timeNumber = Number(timeArray.join(''));
            console.log("timeNumber is: ", timeNumber);
            if(timeNumber > 1030 && timeNumber < 2130){
                next()}
            else{
                res.status(400).send({ error: 'reservation_time should be between 10:30am and 9:30pm' })  
            }
        }else{
        res.status(400).send({ error: 'reservation_time should be in correct format' })} 
    }

    if(property == "people"){
        typeof req.body.data[property] == 'number' ? next() : next({status: 400, message: 'people field must be a number'})
    }
}
}

module.exports = validatorFor;