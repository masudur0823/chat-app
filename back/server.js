const db = require("./models");
const express = require('express');
var cors = require('cors')

const contactsRoutes = require('./routes/route_contacts');
const userRoutes = require('./routes/route_users');
const tenantRoutes = require('./routes/route_tenants');
const messageRoutes = require('./routes/route_messages');
const settingsRoute = require('./routes/route_settings');
const numbersRoute = require('./routes/route_numbers');
const authRoute  =  require('./routes/route_authentification');
const sessiondataRoute = require('./routes/route_sessions');
const templateRoute = require('./routes/route_templates');
const integrationRoute = require('./routes/route_integrations');
const { qrHandler, statusHandler } = require('./config/numberHandler');
const {IncomingMessageHandler} = require('./config/IncomingMessageHandler');
const fileUpload = require('express-fileupload');
const path = require('path');


const client = require('./config/redis.config');
const app = express();
app.use(express.json());
app.use(cors());

app.use(fileUpload());

db.sequelize.sync({ logging: false}).then(() => {
  console.log("Drop and re-sync db." ); 
});
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`A user connected with socket id ${socket.id}`);

    socket.on('join', (userId) => {
      console.log(`User ${userId} joined`);
      socket.join(userId);
    });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const session = require('express-session');

app.use(session({
  secret: 'Yw6CZfDhq!&6uFmx', 
  resave: false,
  saveUninitialized: true
}))

// reset and restore settings every time server restarts

async function cacheTenantSettings() {
  try {
    const settingsArray = await db.settings.findAll();     
  
    for (let setting of settingsArray) {
      const tenantKey = `tenantSettings:${setting.tenantID}`;
      const keyType = await client.type(tenantKey);
      console.log(`Key ${tenantKey} is of type: ${keyType}`);
      
        await client.del(tenantKey);

   
      
        const setIfDefined = async (key, field, value) => {
          if (value !== undefined && value !== null) {
              await client.hSet(key, field, value);
          }
      };
      
      if (setting) {
          await setIfDefined(tenantKey, "permissionall", setting.permissionall);
          await setIfDefined(tenantKey, "communicationmode", setting.communicationmode);
          await setIfDefined(tenantKey, "asignacion", setting.asignacion);
          await setIfDefined(tenantKey, "zohointegration", setting.zohointegration);
          await setIfDefined(tenantKey, "schoolintegration", setting.schoolintegration);
          await setIfDefined(tenantKey, "facebookintegration", setting.facebookintegration);
          await setIfDefined(tenantKey, "tokenwp", setting.tokenwp);
          await setIfDefined(tenantKey, "tokenfb", setting.tokenfb);
          await setIfDefined(tenantKey, "tokenschool", setting.tokenschool);
          await setIfDefined(tenantKey, "tokenzoho", setting.tokenzoho);
          await setIfDefined(tenantKey, "suscription", setting.suscription);
          await setIfDefined(tenantKey, "accId", setting.accId);
          
      }
      
    }
  } catch (error) {
    console.error("Error caching settings to Redis: ", error);
  }
}

// Run the function to cache settings on server start
cacheTenantSettings();

app.use('/api/auth', authRoute);
app.use('/api/contacts', contactsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/settings', settingsRoute);
app.use('/api/numbers', numbersRoute);
app.use('/api/integrations', integrationRoute);
app.use('/api/sessiondata', sessiondataRoute);
app.use('/api/templates', templateRoute);
app.use('/images', express.static(path.join(__dirname, 'routes', 'images')));



app.post('/api/qr', (req, res) => qrHandler(req, res, io));
app.post('/api/numberstatus', (req, res) => statusHandler(req, res, io));
app.post('/api/externalmessages', (req, res) => IncomingMessageHandler(req, res, io));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
