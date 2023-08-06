const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/', async (req, res) => {
    const allSessionData = req.session.tenantSettings;
    res.json({ message: allSessionData });
  });
  
  
  
  


module.exports = router;