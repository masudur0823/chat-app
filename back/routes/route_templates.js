const express = require('express');
const router = express.Router();
const db = require("../models");
const handleTemplates = require('../handlers/templates_forwarder');

router.post('/', async (req, res) => {
  const tenantId = req.headers.tenantid;
  console.log(parseInt(tenantId));

  let newObject = req.body; 
  newObject.tenantId = parseInt(tenantId);

  try {
      // Create a new message in your own database
      const template = await db.templates.create(newObject);

      // Send the template data to another service using the handleTemplates function
      const externalServiceResponse = await handleTemplates(newObject);

      // Log the response or handle it as necessary
      console.log('Response from external service:', externalServiceResponse);

      res.status(201).json(template);
  } catch (error) {
      console.error("Error:", error.message); // Log the specific error message
      res.status(500).json({ error: "Server error" });
  }
});


router.get('/', async (req, res) => {
    const tenantId = req.headers.tenantid;

      db.templates.findAll({
        where: { tenantId: tenantId },
      })
      .then((template) => {
        console.log(">> templates readed: " + JSON.stringify(template, null, 4));
        res.json(template);
      })
      .catch((err) => {
        console.log(">> Error while reading templates: ", err);
        res.status(500);
      });
    
      })

      router.put('/:id', async (req, res) => {
        console.log(req.body);
        db.templates.update(req.body,{where:{id: req.params.id}})
      .then((template) => {
        console.log(">> Edited template: " + JSON.stringify(template, null, 4));
        res.json(template);
      })
      .catch((err) => {
        console.log(">> Error while creating template: ", err);
        res.status(500);
      });
      
      })
      


module.exports = router;