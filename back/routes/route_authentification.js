const express = require('express');
const router = express.Router();
const db = require("../models");
const jwt = require('jsonwebtoken');
const Tenant = db.tenants;
const User = db.users;
const Setting = db.settings;
const client = require('../config/redis.config')
const dbConfig = require("../config/db.config.js");




      router.post('/users', async (req, res) => {
        const { username,password,tenantId,role } = req.body;
        User.create({
        username: username,
        password:password,
        tenantId:tenantId,
        role:role,
      })
        .then((user) => {
          console.log(">> Created User: " + JSON.stringify(user, null, 4));
          res.sendStatus(201)
        })
        .catch((err) => {
          console.log(">> Error while creating User: ", err);
        });
        
        })


        router.post('/login', async (req, res) => {
          const { username, password } = req.body;
          console.log(req.body)
          try {
            const user = await User.findOne({
              where: {
                username: username,
                password: password
              }
            });
        
            if (!user) {
              return res.status(401).json({ error: 'Invalid credentials' });
            }

             
            const token = jwt.sign({role:user.role, username: username,iduser:user.id,  tenantID: user.tenantId,expiresIn: (Date.now() / 1000) + 7200 }, dbConfig.jwt_secret);
            res.json({ token: token, tenant: user.TenantId,user:user});
          } catch (err) {
            console.error('Error executing query', err);
            res.sendStatus(500);
          }
        });



        router.post('/register', async (req, res) => {
          const { username, password, tenantName } = req.body;
          console.log(req.body)
        
          try {
            const existingUser = await User.findOne({
              where: {
                username: username
              }
            });
        
            if (existingUser) {
              return res.status(400).json({ error: 'User already exists' });
            }
        
            const tenant = await Tenant.create({ name: tenantName });
            //console.log(tenant)
            const settings = await Setting.create({"permissionall":"yes",tenantID:tenant.id,suscription:"test",asignacion:"Admin"});
            console.log(tenant.id)
            
            let tenantKey = String(tenant.id);
            console.log(tenantKey)
            const type = await client.type(`tenantSettings:${tenantKey}`);
            //console.log(`Key type for tenantSettings:${tenantKey} is`, type);
            await client.del(`tenantSettings:${tenantKey}`);

            await client.hSet(`tenantSettings:${tenantKey}`, "permissionall", "yes");
            
            await client.hSet(`tenantSettings:${tenantKey}`, "communicationmode","Official");
            await client.hSet(`tenantSettings:${tenantKey}`, "asignacion", "Admin");
            await client.hSet(`tenantSettings:${tenantKey}`, "suscription","test");
            
            const newUser = await User.create({ username: username, password: password,role:"admin", tenantId: tenant.id,expiresIn:  (Date.now() / 1000 + 7200) + 7200  });
            //console.log(newUser);
            const token = jwt.sign({ username: username, tenantId: tenant.id,iduser:newUser.id }, dbConfig.jwt_secret);
            res.json({ token: token, tenantID: tenant.id });
          } catch (err) { 
            console.error('Error executing query', err);
            res.sendStatus(500);
          }
          
        });

module.exports = router;
