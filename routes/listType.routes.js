module.exports = app => {
    const listType = require("../controllers/listType.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", listType.create);

    //delete all
    router.delete("/delete-all", listType.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", listType.delete);

    //get all  
    router.get("/listType", listType.findAll);

    //get by name
    router.get("/listType/:name", listType.getByName);


    app.use('/api/listType', router);
  };