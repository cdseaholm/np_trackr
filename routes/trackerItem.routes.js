module.exports = app => {
    const trackerItem = require("../controllers/trackerItem.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", trackerItem.create);

    //delete all
    router.delete("/delete-all", trackerItem.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", trackerItem.delete);

    //get all  
    router.get("/get/all", trackerItem.findAll);

    //get by name
    router.get("/get/:name", trackerItem.getByName);

    //update by name
    router.put("/update/:name", trackerItem.update);


    app.use('/api/trackerItem', router);
  };