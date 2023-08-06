const express = require('express');
const router = express.Router();
const db = require("../models");
const client = require('../config/redis.config');


router.post('/', async (req, res) => {
   const tenantId = req.headers.tenantid;
  console.log(parseInt(tenantId))
  newObject = req.body
  newObject.tenantId = parseInt(tenantId);
  try {
    // Create a new message
    const setting = await db.settings.create(newObject);


    res.status(201).json(setting);
  } catch (error) {
    console.error(error.setting);
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/', async (req, res) => {
    const tenantId = req.headers.tenantid;

      db.settings.findAll({
        where: { tenantID: tenantId },
      })
      .then((setting) => {
        console.log(">> settings readed: " + JSON.stringify(setting, null, 4));
        res.json(setting);
      })
      .catch((err) => {
        console.log(">> Error while reading settings: ", err);
        res.status(500);
      });
    
      })


      router.get('/:id', async (req, res) => {
        const setting_id = parseInt(req.params.id);
        console.log("Get by id")
        
        try {
          const setting = await db.settings.findOne({ 
            where: { tenantID: setting_id },
          });
      
          if (!setting_id) {
            console.log(">> No settings found with ID: " + setting_id);
            res.status(404).json({ message: "No settings found with this ID." });
            return;
          }
      
          console.log(">> Found settings: " + JSON.stringify(setting, null, 4));
          res.json(setting);
        } catch (err) {
          console.log(">> Error while finding settings: ", err);
          res.status(500).json({ message: "Error while finding settings." });
        }
      });

      router.put('/', async (req, res) => { 
        const tenantId = req.headers.tenantid;
        newSettings = req.body;
        const {permissionall,communicationmode} = req.body;
        console.log(req.body);
        
        try {
          // Update the settings in the database
          const updatesetting = await db.settings.update({communicationmode,permissionall,tenantID:tenantId}, {
            where: { tenantID: tenantId }
          });
          console.log(updatesetting);
          // Update the settings in the session
        try {
                const result = await client.HSET(`tenantSettings:${tenantId}`,"communicationmode",communicationmode);
                console.log('HSET Result:', result);
            } catch (err) {
                console.error('Error setting hash values:', err);
            }
        try {
              const result = await client.HSET(`tenantSettings:${tenantId}`,"permissionall",permissionall);
              console.log('HSET Result:', result);
          } catch (err) {
              console.error('Error setting hash values:', err);
          }    
          try {
            const result = await client.HSET(`tenantSettings:${tenantId}`,"asignacion",asignacion);
            console.log('HSET Result:', result);
        } catch (err) {
            console.error('Error setting hash values:', err);
        }        
  

          
          res.json({ message: "Settings updated" });
        } catch (err) {
          console.error('Error executing query', err);
          res.sendStatus(500);
        }
      });


      


module.exports = router;