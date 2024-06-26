const uses = require("../data/uses-data");

//check if the get request has the correct useId
function useExists(req, res, next){
    const { useId } = req.params;
    const foundUse = uses.find(use => use.id === Number(useId));
    if(foundUse){
        res.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use ${useId} does not exist`
    });
}

//   GET "/uses/:useId"  --> retrieve a use metric by id
function read(req, res){
    res.json({data: res.locals.use});
}
 
//   DELETE "/uses/:useId"  --> Delete a use method by Id
function destroy(req, res, next){
    uses.splice(res.locals.use.id - 1, 1);
    res.sendStatus(204);
}

//  GET  "/uses" --> retireve a list of all use metrics
function list(req, res){
    const { urlId } = req.params;
    const filteredUses =  uses.filter(use => urlId ? use.urlId == Number(urlId) : true);
    res.json({data: filteredUses});
}


module.exports = {
    read: [
        useExists,
        read
    ],
    list,
    delete: [
        useExists,
        destroy
    ]
};