const router = require("express").Router();
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//cannot create a use method --> if so route to methodNotAllowed!


module.exports = router;
