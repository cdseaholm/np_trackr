const db = require("../models");
const List_Item = db.listItem;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    if (!req.body.name || !req.body.listid) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const list_Item = {
      name: req.body.name,
      listid: req.body.listid,
    };
  
    List_Item.create(list_Item)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the List_Item."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    List_Item.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} List_Items were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all list_Items."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    List_Item.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "List_Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete List_Item with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
      List_Item.findAll()
        .then(data => {
          console.log('data:', data);
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving list_Items."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    List_Item.findOne({ where: { name: name } })
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
  const listid = req.params.listid;

  List_Item.update(req.body, {
    where: { name, listid }
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