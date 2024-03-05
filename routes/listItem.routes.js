module.exports = app => {
    const listItem = require("../controllers/listItem.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", listItem.create);

    //delete all
    router.delete("/delete/all", listItem.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", listItem.delete);

    //get all  
    router.get("/get/all", listItem.findAll);

    //get by name
    router.get("/get/:name", listItem.getByName);

    //update by name
    router.put("/update/:name", listItem.update);

    app.use('/api/list/item', router);
  };