const express = require('express');
const router = express.Router();
const db = require("../models");
const client = require('../config/redis.config');

router.get('/', async (req, res) => {
    const tenantId = req.headers.tenantid;
    console.log("TENANT " + tenantId);


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
        console.log(req.body);
        const tenantId = req.headers.tenantid;
        newSettings = req.body;
        const {permissionall,communicationmode} = req.body;
        res.status(200).json({ message: "OK" });
        console.log("OK");
      });


      


module.exports = router;