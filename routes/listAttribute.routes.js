module.exports = app => {
    const listAttribute = require("../controllers/listAttribute.controller.js");
  
    var router = require("express").Router();

    //create
    router.post("/create", listAttribute.create);

    //delete all
    router.delete("/delete-all", listAttribute.deleteAll);
    
    //delete by name
    router.delete("/delete/:name", listAttribute.delete);

    //get all  
    router.get("/get/all", listAttribute.findAll);

    //get by name
    router.get("/get/:name", listAttribute.getByName);


    app.use('/api/list/attribute', router);
  };