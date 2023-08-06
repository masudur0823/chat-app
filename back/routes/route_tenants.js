const express = require('express');
const router = express.Router();
const db = require("../models");
const Tenant = db.tenants;

router.post('/', async (req, res) => {
      newObject = req.body
    try {
      // Create a new contact
      const tenant = await db.tenants.create(newObject);

  
      res.json(tenant);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  


  router.get('/:id', async (req, res) => {
    const tenant_id = parseInt(req.params.id);
    console.log(tenant_id)
    User.findByPk(tenant_id, {

    })
      .then((tenant) => {
        if (!tenant) {
          return res.status(404).send({
            message: "tenant not found with id " + req.params.id,
          });
        }
        res.status(200).send(tenant);
      })
      .catch((err) => {
        res.status(500).send({
          message: "user retrieving tenant with id=" + req.params.id,
        });
      });
  });
  module.exports = router;