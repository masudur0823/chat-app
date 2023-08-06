require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require("../models");


const axios = require('axios');

router.post('/', async (req, res) => {
  console.log(req.body)
  const {userId,number} = req.body;
   const tenantId = req.headers.tenantid;
   console.log(parseInt(tenantId));
   newObject = req.body;
   newObject.tenantId = parseInt(tenantId);
   try {
     // Create a new message
     const number = await db.numbers.create(newObject);

     // POST request to another server
     const response = await axios.post(process.env.ROUTE_UNOFFICIAL + '/create-session', {
      id: userId,
       number: number 
     });
     //console.log(response) 

     res.status(201).json(number);
   } catch (error) {
     console.error(error.number);
     res.status(500).json({ error: "Server error" });
   }
});



router.get('/', async (req, res) => {
    const tenantId = req.headers.tenantid;

      db.numbers.findAll({
        where: { tenantId: tenantId },
      })
      .then((number) => {
        console.log(">> numbers readed: " + JSON.stringify(number, null, 4));
        res.json(number);
      })
      .catch((err) => {
        console.log(">> Error while reading numbers: ", err);
        res.status(500);
      });
    
      })

      router.get('/:id', async (req, res) => {
        const number_id = parseInt(req.params.id);
        console.log(number_id)
        try {
          const number = await db.numbers.findOne({ 
            where: { id: number_id },
          });
      
          if (!number_id) {
            console.log(">> No number found with ID: " + number_id);
            res.status(404).json({ message: "No number found with this ID." });
            return;
          }
      
          console.log(">> Found number_id: " + JSON.stringify(number, null, 4));
          res.json(number);
        } catch (err) {
          console.log(">> Error while finding number: ", err);
          res.status(500).json({ message: "Error while finding number." });
        }
      });

      router.put('/:id', async (req, res) => {
        db.numbers.update(req.body,{where:{id: req.params.id}})
      .then((number) => {
        console.log(">> Edited number: " + JSON.stringify(number, null, 4));
        res.json(number);
      })
      .catch((err) => {
        console.log(">> Error while creating setting: ", err);
        res.status(500);
      });
      
      })

      router.delete('/:id', async (req, res) => {
        console.log(req);
        db.numbers.destroy({ where: { id: req.params.id } })
        .then((number) => {
          console.log(">> deleted number: " + JSON.stringify(number, null, 4));
          res.json("Deteled " +req.params.id );
        })
        .catch((err) => {
          console.log(">> Error while deleting number: ", err);
          res.status(500);
        });
        
        })

module.exports = router;