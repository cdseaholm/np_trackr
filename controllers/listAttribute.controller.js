const db = require("../models");
const List_Attribute = db.listAttribute;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    if (!req.body.name || !req.body.type || !req.body.placeholder) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
      const list_Attribute = {
        name: req.body.name,
        listid: req.body.parentid,
        type: req.body.type,
        placeholder: req.body.placeholder
      };
  
    List_Attribute.create(list_Attribute)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the List_Attribute."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    List_Attribute.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} List_Attributes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all list_Attributes."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    List_Attribute.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "List_Attribute was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete List_Attribute with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
    const listid = req.query.listid;
      var condition = listid ? { listid: { [Op.iLike]: `%${listid}%` } } : null;
    
      List_Attribute.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving list_Attributes."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    List_Attribute.findOne({ where: { name: name } })
        .then(data => {
            if (data) {
                res.send({ data });
            } else {
                res.send({ message: `Cannot find Tracker_Item with name=${name}.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Tracker_Item with name=" + name
            });
        });
  };

//update by id
exports.update = (req, res) => {
  const id = req.params.childID;
  const { parentID } = req.query;

  List_Attribute.update({ listid: parentID }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Custom Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Custom Item. Maybe Account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Custom item"
      });
    });
};