module.exports = app => {
    const itemAttribute = require("../controllers/itemAttribute.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", itemAttribute.create);

    //delete all
    router.delete("/delete/all", itemAttribute.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", itemAttribute.delete);

    //get all  
    router.get("/get/all", itemAttribute.findAll);

    //get by listid
    router.get("/get/:itemid", itemAttribute.getBylistid);

    //update by id
    router.put("/update/:id", itemAttribute.update);


    app.use('/api/list/item/attribute', router);
  };