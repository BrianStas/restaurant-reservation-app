

// function tableUpdateValidator() {
//     return function (req, res, next){
//         console.log("req body looks like: ", req.body);
//         const reservation = res.locals.reservation
//         console.log("Controller line 30, reservation set to: ", reservation);
//         if(reservation && reservation.people > res.locals.table.capacity){
//             return next({status:400, message: "table is too small"});
//         }
//         if(res.locals.table.reservation_id != null){
//             return next({status:400, message: "table is occupied"});
//         }
//         next();
//         }
// }

// module.exports = tableUpdateValidator;