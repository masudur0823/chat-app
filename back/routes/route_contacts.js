const express = require('express');
const router = express.Router();
const db = require("../models");
const jwt = require('jsonwebtoken');
const client = require('../config/redis.config');

require('dotenv').config();


router.post('/', async (req, res) => {
    //console.log(req.body)
    const tenantId = req.headers.tenantid;
      //console.log(parseInt(tenantId))
      newObject = req.body
      newObject.tenantId = parseInt(tenantId);
      //console.log("USerID " +req.headers );
      newObject.userId = req.headers?.userid;
      console.log(newObject)
    try {
      // Create a new contact
      const contact = await db.contacts.create(newObject);
  
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
  router.get('/', async (req, res) => {
    // detectar si es individual o all 
    //console.log(req.headers);
    const tenantId = req.headers.tenantid;
    const permissionall = client.hGetAll(`tenantSettings:${tenantId}`)?.permissionall;
    //console.log('hGetAll Result:', permissionall);

    
    let token = req.headers.authorization;
    let userId;
  
    if (!token) {
      res.status(401).json({ message: "Authorization header missing." });
      return;
    }
  
    try {
      token = token.split(' ')[1]; // Bearer <token>
  
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log(parseInt(tenantId))
      // Extract the user id
      userId = decoded.userId; // adjust this line to match the structure of your JWT payload
    } catch (err) {
      console.log(">> Error while decoding JWT: ", err);
      res.status(500).json({ message: "Error while decoding JWT." });
      return;
    }
    
    if (permissionall === "no") {
      var paramsearch = { tenantId: parseInt(tenantId) ,userId:userId};
    } else {
      var paramsearch = { tenantId: parseInt(tenantId) };
    }
    // 

      // Extract page and pageSize from query params
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 20;

  
      // Calculate the offset based on page number
      const offset = (page - 1) * pageSize;
    console.log ("page: " + page +" pageSize " + pageSize + " Oddset " + offset);
      try {
        const contacts = await db.contacts.findAll({
          attributes: [
            // ... other contact attributes
            "last_name",
            "first_name",
            "email",
            "source",
            "tel",
            "channel",
            "id",
            [db.Sequelize.literal(`( 
                SELECT COUNT(*)
                FROM messages as m
                WHERE m."createdAt" < contact."lastAccess"
                AND m."contactId" = contact.id
                AND m."incoming" = false 
            )`), 'unreadCount']  // This adds an attribute 'unreadCount' to the result
          ],
          where: paramsearch,
          include: [
            {
              model: db.message,
              as: 'messages',
              order: [['createdAt', 'DESC']],  // This will order the messages by creation time, most recent first.
            },
            {
              model: db.users,
              as: 'users',
            },
          ],
          order: [
            [db.Sequelize.literal(`CASE WHEN (SELECT MAX(messages."createdAt") FROM messages WHERE messages."contactId" = contact.id) IS NOT NULL THEN 0 ELSE 1 END`), 'ASC'],
            [db.Sequelize.literal(`(SELECT MAX(messages."createdAt") FROM messages WHERE messages."contactId" = contact.id)`), 'DESC']
        ],
          limit: pageSize,
          offset: offset
        });

        const totalContacts = await db.contacts.count({
          where: paramsearch
        });

        res.json({
          contacts,
          total: totalContacts
        });
      } catch (err) {
        console.log(">> Error while reading contacts: ", err);
        res.status(500).json({ message: "Error while fetching contacts." });
      }
});


router.put('/:id', async (req, res) => {
  console.log(req.body);
  db.contacts.update(req.body,{where:{id: req.params.id}})
.then((contact) => {
  console.log(">> Edited contact: " + JSON.stringify(contact, null, 4));
  res.json(contact);
})
.catch((err) => {
  console.log(">> Error while creating setting: ", err);
  res.status(500);
});

})
  
router.get('/:id', async (req, res) => {
  const contact_id = parseInt(req.params.id);

  try {
    // First, update the 'lastAccessed' field
    const updateResult = await db.contacts.update(
      {
        lastAccess: new Date(), // setting the current date and time
      },
      {
        where: {
          id: contact_id,
        },
      }
    );

    // Check if the update was successful
    if (updateResult[0] === 0) {
      return res.status(404).send({
        message: "Contact not found with id " + contact_id,
      });
    }

    // Now fetch the contact
    const contact = await db.contacts.findByPk(contact_id, {
      include: [
        {
          model: db.message,
          as: 'messages',
        },
        {
          model: db.users,
          as: 'users',
        },
      ],
    });

    // Make sure the contact exists (it should, but let's be safe)
    if (!contact) {
      return res.status(404).send({
        message: "Contact not found with id " + contact_id,
      });
    }

    // Send the fetched contact
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving or updating contact with id=" + contact_id,
    });
  }
});



  
  router.delete('/:id', async (req, res) => {
    //console.log(req);
    db.contacts.destroy({ where: { id: req.params.id } })
    .then((contact) => {
      console.log(">> deleted Contact: " + JSON.stringify(contact, null, 4));
      res.json("Deteled " +req.params.id );
    })
    .catch((err) => {
      console.log(">> Error while deleting contact: ", err);
      res.status(500);
    });
    
    })
  module.exports = router;