const db = require("../models");
const List_Type = db.listType;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const existingList = await List_Type.findOne({ where: { name: req.body.name } });
      if (existingList) {
        res.status(400).send({
          message: "A list with this name already exists!"
        });
        return;
      }

    const list_Type = {
      name: req.body.name,
    };
  
    List_Type.create(list_Type)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the List_Type."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    List_Type.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} List_Types were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all list_Types."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    List_Type.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "List_Type was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete List_Type with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
      List_Type.findAll()
        .then(data => {
          console.log('Data:', data);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving list_Types."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    List_Type.findOne({ where: { name: name } })
        .then(data => {
            if (data) {
                res.send({ data });
            } else {
                res.send({ message: `Cannot find List_Type with name=${name}.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving List_Type with name=" + name
            });
        });
  };