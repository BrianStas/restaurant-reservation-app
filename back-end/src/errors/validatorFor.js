const validator = require('validator');


function validatorFor(property) {
    // const removeTime = (date = new Date()) => {
    //     return new Date(
    //       date.getFullYear(),
    //       date.getMonth(),
    //       date.getDate()
    //     );
    //   }
    // today.getFullYear().toString()
    return function (req, res, next){
    if(property == "reservation_date"){
        
        const today = new Date();
        const todayString = (today.getFullYear().toString() + today.getMonth().toString() + today.getDate().toString())
        const givenDate = new Date(req.body.data[property]); 
        const givenDateString = (givenDate.getFullYear().toString()+ givenDate.getMonth().toString()) + (givenDate.getDate().toString())
        
        console.log("given date: ", givenDateString, "Today: ", todayString);
        if((Number(givenDateString)+1) < Number(todayString)){
            return res.status(400).send({ error: 'reservation_date must be a future date'});
        }
        const dayOfGivenDate = givenDate.getDay();
        if(dayOfGivenDate === 1){
            console.log("Tuesday found: ", givenDate);
            return res.status(400).send({ error: 'closed on Tuesdays'});
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
               return res.status(400).send({ error: 'reservation_time should be between 10:30am and 9:30pm' })  
            }
        }else{
       return res.status(400).send({ error: 'reservation_time should be in correct format' })} 
    }

    if(property == "people"){
        typeof req.body.data[property] == 'number' ? next() : next({status: 400, message: 'people field must be a number'})
    }
}
}

module.exports = validatorFor;