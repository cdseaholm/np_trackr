module.exports = app => {
    const rankerItem = require("../controllers/rankerItem.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", rankerItem.create);

    //delete all
    router.delete("/delete-all", rankerItem.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", rankerItem.delete);

    //get all  
    router.get("/get/all", rankerItem.findAll);

    //get by name
    router.get("/get/:name", rankerItem.getByName);

    //update by name
    router.put("/update/:name", rankerItem.update);


    app.use('/api/rankerItem', router);
  };