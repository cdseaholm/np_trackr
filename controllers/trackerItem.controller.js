const db = require("../models");
const Tracker_Item = db.trackerItem;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
  console.log('Request body:', req.body);

    const tracker_Item = {
      name: req.body[0].name,
      category: req.body[0].category,
      notes: req.body[0].notes,
    };
  
    Tracker_Item.create(tracker_Item)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Tracker_Item."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    Tracker_Item.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tracker_Items were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tracker_Items."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    Tracker_Item.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tracker_Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tracker_Item with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
    const category = req.query.category;
      var condition = category ? { category: { [Op.iLike]: `%${category}%` } } : null;
    
      Tracker_Item.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tracker_Items."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    Tracker_Item.findOne({ where: { name: name } })
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

  Tracker_Item.update(req.body, {
    where: { name, category, notes}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tracker Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tracker Item. Maybe Tracker Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tracker Item"
      });
    });
};