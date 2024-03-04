const db = require("../models");
const List_Attribute = db.listAttribute;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    console.log('Request body:', req.body);
  
      const list_Attribute = {
        name: req.body[0].name,
        itemid: req.body[0].itemid,
        value: req.body[0].value,
        type: req.body[0].type,
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

//update by name
exports.update = (req, res) => {
  const name = req.params.name;
  const { itemid, value, type } = req.query;

  List_Attribute.update(req.body, {
    where: { name, itemid, value, type}
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