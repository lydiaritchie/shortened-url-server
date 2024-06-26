const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//url exsits
function urlExists(req, res, next){
    const { urlId } = req.params;
    const foundUrl = urls.find((url) => url.id == Number(urlId));
    if(foundUrl){
        res.locals.url = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `url ${urlId} does not exsist.`
    });
}

//req has data
function reqHasHref(req, res, next){
    const { href } = req.body.data;
    if(href){
        return next();
    }
    next({
        status: 400,
        message: `href property is required`
    });
}

//POST "/urls" --> create a new short url
//return the saved object as a response to the client
function create(req, res, next){
    //define the id
    const newId = urls.length + 1;
    //create a new url object
    const newUrl = {
        "href": req.body.data.href,
        "id": newId,
      }
    //push the new object
    urls.push(newUrl);
    //return the new object (the id will be automatically created because its an array right?)
    res.status(201).json({data: newUrl});
}


//GET  "/urls/:urlId" --> Retrieve a short url by id
function read(req, res){
    const newId = uses.length + 1;
    const newUse = {
        id: newId,
        urlId: res.locals.url.id,
        time: Date.now(),
      }
    uses.push(newUse);
    res.json({data: res.locals.url, newUse});
}

//PUT  "/urls/:urlId"  --> Update a short url by ID
function update(req, res){
    const newLink = req.body.data.href;
    const url = res.locals.url;
    url.href = newLink;
    res.status(200).json({data: res.locals.url});
}

//GET  "/urls"  --> Retrieve a list of all short URLs
function list(req, res){
    res.json({data: urls});
}

//GET "/urls/:urlId/uses" --> retrieve a list of metrics for a given short URL ID


//GET "urls/:urlId/uses/useID" --> retirieve a use metric by Id for a given short URL id

module.exports = {
    list,
    urlExists,
    create: [
        reqHasHref,
        create
    ],
    read: [
        urlExists,
        read
    ],
    update: [
        reqHasHref,
        urlExists,
        update
    ]
};