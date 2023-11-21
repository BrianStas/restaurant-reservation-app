const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const tablesService = require("./tables.service");

async function list(req, res) {    
    const isOpen = req.query.is_open;
    if(isOpen){
        const data = await tablesService.filteredList();
        res.json({ data});
    }else{
    const data = await tablesService.list();
    res.json({ data });
        }
}

async function create(req, res) { 
    const data = await tablesService.create(req.body.data);
    res.status(201).json({ data });
  }

  function read(req, res) {
    const { table: data } = res.locals;
    res.json({ data });
  
  }

  async function update(req, res) {
    const updatedTable = {
      ...res.locals.table,
      reservation_id: req.body.data.reservation_id,
    };
    console.log("made to update back end. Data is: ", req.body.data)
    const data = await tablesService.update(updatedTable);
    res.json({ data });
  }

async function tableExists(req, res, next) {
    const table = await tablesService.read(req.params.tableId);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({ status: 404, message: `Table ${req.params.tableId} cannot be found.` });
  }
  
  const VALID_PROPERTIES = [
    "table_id",
    "table_name",
    "capacity",
    "reservation_id"
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
  
  const hasRequiredProperties = hasProperties(
    "table_name",  
    "capacity");

    module.exports = {
        list: asyncErrorBoundary(list),
        create: [hasOnlyValidProperties, 
          hasRequiredProperties, 
          create],
          read: [asyncErrorBoundary(tableExists), read],
        update: [asyncErrorBoundary(tableExists), hasOnlyValidProperties, update],
      };