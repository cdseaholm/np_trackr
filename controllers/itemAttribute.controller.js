const db = require("../models");
const Item_Attribute = db.itemAttribute;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {

  if (!req.body.name || !req.body.type || !req.body.placeholder) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

    const item_Attribute = {
      name: req.body.name,
      itemid: req.body.parentid,
      type: req.body.type,
      placeholder: req.body.placeholder,
      value: req.body.value,
      listid: req.body.listid
    };

  Item_Attribute.create(item_Attribute)
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
      Item_Attribute.findAll()
        .then(data => {
          console.log('data:', data);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving item_Attributes."
          });
        });
  };
  
  //get by id
  exports.getByitemid = (req, res) => {
    const id = req.params.id;
    Item_Attribute.findOne({ where: { id: id } })
        .then(data => {
            if (data) {
                res.send({ data });
            } else {
                res.send({ message: `Cannot find Tracker_Item with id=${id}.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Tracker_Item with id=" + id
            });
        });
  };

//update by name
exports.update = (req, res) => {
  
  const id = req.params.id;
  const { itemid, value } = req.query;

  Item_Attribute.update(
    { itemid: itemid, value: value },
    { where: { id: id }}
  )
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