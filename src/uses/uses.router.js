const router = require("express").Router({mergeParams: true});
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//cannot create a use method --> if so route to methodNotAllowed!
router.route("/:useId").get(controller.read).delete(controller.delete).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
