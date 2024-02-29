const db = require("../models");
const Ranker_Item = db.rankerItem;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    console.log('Request body:', req.body);

    const ranker_Item = {
      name: req.body[0].name,
      category: req.body[0].category,
      notes: req.body[0].notes,
      rank: req.body[0].rank
    };
  
    Ranker_Item.create(ranker_Item)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Ranker_Item."
        });
      });
  };
  
  //delete all
  exports.deleteAll = (req, res) => {
    Ranker_Item.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Ranker_Items were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ranker_Items."
        });
      });
  };
  
  //delete by name
  exports.delete = (req, res) => {
    const name = req.body.name;
  
    Ranker_Item.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ranker_Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Ranker_Item with name=" + name
        });
      });
  };
  
  //get all
  exports.findAll = (req, res) => {
    const category = req.query.category;
      var condition = category ? { category: { [Op.iLike]: `%${category}%` } } : null;
    
      Ranker_Item.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving ranker_Items."
          });
        });
  };
  
  //get by name
  exports.getByName = (req, res) => {
    const name = req.params.name;
    Ranker_Item.findOne({ where: { name: name } })
        .then(data => {
            if (data) {
                res.send({ data });
            } else {
                res.send({ message: `Cannot find Ranker_Item with name=${name}.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Ranker_Item with name=" + name
            });
        });
  };