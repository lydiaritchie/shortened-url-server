const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:urlId").get(controller.read).put(controller.update).all(methodNotAllowed);
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

//move urlExists into an array to be exporeted!

/*  
POST "/urls" --> create a new short url

GET  "/urls/:urlId" --> Retrieve a short url by id

PUT  "/urls/:urlId"  --> Update a short url by ID

GET  "/urls"   --> Retrieve a list of all short URLs

GET "/urls/:urlId/uses" --> retrieve a list of metrics for a given short URL ID

GET "urls/:urlId/uses/useID" --> retirieve a use metric by Id for a given short URL id
*/


module.exports = router;