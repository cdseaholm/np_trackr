const db = require("../models");
const Item_Attribute = db.itemAttribute;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {

  if (!req.body.name || !req.body.value || !req.body.type || !req.body.placeholder) {

    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
      const item_Attribute = {
        name: req.body.name,
        itemid: req.body.parentid,
        value: req.body.value,
        type: req.body.type,
        placeholder: req.body.placeholder
      };
  
    Item_Attribute.create(item_Attribute)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Item_Attribute."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    Item_Attribute.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Item_Attributes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all item_Attributes."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    Item_Attribute.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item_Attribute was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item_Attribute with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
    const itemid = req.query.itemid;
      var condition = itemid ? { itemid: { [Op.iLike]: `%${itemid}%` } } : null;
    
      Item_Attribute.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving item_Attributes."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    Item_Attribute.findOne({ where: { name: name } })
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

  Item_Attribute.update(req.body, {
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