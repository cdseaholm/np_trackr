const db = require("../models");
const Custom_Item = db.customItem;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    console.log('Request body:', req.body);
  
      const custom_Item = {
        name: req.body[0].name,
        category: req.body[0].category,
        notes: req.body[0].notes,
      };
  
    Custom_Item.create(custom_Item)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Custom_Item."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    Custom_Item.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Custom_Items were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all custom_Items."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    Custom_Item.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Custom_Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Custom_Item with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
    const category = req.query.category;
      var condition = category ? { category: { [Op.iLike]: `%${category}%` } } : null;
    
      Custom_Item.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving custom_Items."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    Custom_Item.findOne({ where: { name: name } })
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
  const { category, notes } = req.query;

  Custom_Item.update(req.body, {
    where: { name, category, notes}
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