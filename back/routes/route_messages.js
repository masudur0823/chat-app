const express = require('express');
const router = express.Router();
const db = require("../models");
const { io, usersSockets } = require('../server');
const handleMessageCreation = require('../handlers/messagesforwarderWP');
const {checkSubscriptionStatus} = require("../handlers/middleware_subscription");
const client = require('../config/redis.config');
const fs = require('fs');
const path = require('path');




router.post('/',checkSubscriptionStatus, async (req, res) => {
  const { contactId } = req.body;
   const tenantId = req.headers.tenantid;
   console.log("USer " + req.headers.userid);
  console.log(parseInt(tenantId))
  newObject = req.body
  newObject.tenantId = parseInt(tenantId);
  newObject.owner = req.headers?.userId;
  try {
    // Create a new message
    const message = await db.message.create(newObject);
    
    try {
      client.keys('*')
  .then(keys => {
    console.log("++", keys);
  })
  .catch(error => {
    console.error('Error fetching keys:', error);
  });
       
      const allSessionData = await client.hGetAll(`tenantSettings:${tenantId}`);
      console.log('HSET Result:', allSessionData);
      
    // handle message creation
    //await handleMessageCreation(allSessionData,req); -- TO ACTIVATE TO RESENT DATA TO WP 
  } catch (err) {
      console.error('Error setting hash values:', err);
  }



    res.status(201).json(message);
} catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
}
  
});


router.get('/',checkSubscriptionStatus, async (req, res) => {
    const tenantId = req.headers.tenantid;

      db.message.findAll({
        where: { tenantId: tenantId },
      })
      .then((message) => {
        console.log(">> Messages readed: " + JSON.stringify(message, null, 4));
        res.json(message);
      })
      .catch((err) => {
        console.log(">> Error while reading messages: ", err);
        res.status(500);
      });
    
      })

      router.get('/:contactId', async (req, res) => {
        console.log(req.query);
        const contactId = parseInt(req.params.contactId);
        const page = parseInt(req.query.page) || 1; // default to page 1 if no page specified
        const limit = 20; // Number of records per page
        const offset = (page - 1) * limit;
    
        console.log(`Fetching messages for contact ${contactId} - page ${page}`);
    
        try {
            // Assuming there's a foreign key relationship between messages and contacts.
            const messages = await db.message.findAll({ 
                where: { contactId: contactId },
                limit: limit,
                offset: offset,
                order: [['createdAt', 'ASC']]  // Fetching newest messages first, change as needed.
            });
    
            if (!messages || messages.length === 0) {
                console.log(`>> No messages found for contact ID: ${contactId}`);
                // Return an empty list instead of a 404
                res.json([]);
                return;
            }
    
            console.log(`>> Found messages: ${JSON.stringify(messages, null, 4)}`);
            res.json(messages);
        } catch (err) {
            console.log(">> Error while finding messages: ", err);
            res.status(500).json({ message: "Error while finding messages." });
        }
    });
    
      const uploadDirectory = path.join(__dirname, 'images');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    
    router.post('/file', async (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
      }
      const { contactId } = req.body;
      const tenantId = req.headers.tenantid;
      const file = req.files.file;
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDirectory, fileName);
  
      file.mv(filePath, async (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
          }
  
          // Construct the URL for the image
          // This assumes your server is serving files statically from the 'images' directory
          const imageUrl = `/images/${fileName}`;
  
          // Create a message with this URL
          const newMessage = {
              text: imageUrl,   // URL path to the image
              type: 'image',
              incoming: true,
              tenantId:tenantId,
              contactId:contactId

          };
          
          try {
              const message = await db.message.create(newMessage);
              // Respond with the created message or any other success response
              res.status(200).json(message);
          } catch (error) {
              console.error("Error creating message:", error);
              res.status(500).send('Failed to create image message.');
          }
      });
  });

module.exports = router;