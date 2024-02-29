module.exports = app => {
    const customItem = require("../controllers/customItem.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", customItem.create);

    //delete all
    router.delete("/delete-all", customItem.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", customItem.delete);

    //get all  
    router.get("get/all", customItem.findAll);

    //get by name
    router.get("/get/:name", customItem.getByName);


    app.use('/api/customItem', router);
  };