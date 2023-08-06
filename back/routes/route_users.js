const express = require('express');
const router = express.Router();
const db = require("../models");
const User = db.users;

router.post('/', async (req, res) => {
    console.log(req.body)
    const tenantId = req.headers.tenantid;
      console.log(parseInt(tenantId))
      newObject = req.body
      newObject.tenantId = parseInt(tenantId);
      console.log(newObject)
    try {
      // Create a new contact
      const user = await db.users.create(newObject);

  
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  });


  router.get('/:id', async (req, res) => {
    const user_id = parseInt(req.params.id);
    console.log(user_id)
    User.findByPk(user_id, {

    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: "user retrieving contact with id=" + req.params.id,
        });
      });
  });

  router.get('/:id', async (req, res) => {
    const user_id = parseInt(req.params.id);
    console.log(user_id)
    User.findByPk(user_id, {

    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: "user retrieving contact with id=" + req.params.id,
        });
      });
  });


  router.get('/', async (req, res) => {
    const tenantId = req.headers.tenantid;

      db.users.findAll({
        where: { tenantId: tenantId },
      })
      .then((user) => {
        console.log(">> numbers readed: " + JSON.stringify(user, null, 4));
        res.json(user);
      })
      .catch((err) => {
        console.log(">> Error while reading users: ", err);
        res.status(500);
      });
    
      })


  module.exports = router;