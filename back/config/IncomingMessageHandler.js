const db = require("../models");
const client = require("../config/redis.config");
const axios = require("axios"); // Assuming you're using axios to make HTTP requests

const IncomingMessageHandler = async (req, res, io) => {
  console.log(req.body);
  const tenantId = req.headers.tenantid;
  const newSettings = client.hGetAll(`tenantSettings:${tenantId}`);

  let contact = await db.contacts.findOne({
    where: {
      tel: req.body.number,
      tenantId: tenantId,
      userId : req.headers?.userid,

    }
  });

  if (!contact) {
    console.log(">> No contact found with number: " + req.body.number);
    // poner logica para asignar el userId dependiendo del carussel. Si es admin busca el super admin. si es carussel busca el ultimo contacto que 
    //se creo a quien se asigno y asigna al user + de siguiente. si es conectado, busca en la lista de los agentes conectados de ese tenant
    //  y de ahi buscar el +1
    /*contact = await db.contacts.create({
      first_name:"",
      last_name:"",
      tel: req.body.number,
      tenantId: tenantId,
      userId:""
    });
    
    let tokenzoho = newSettings?.tokenzoho;
    // Assuming handlers_zoho_crm is another module with a function that handles Zoho integration
      if (tokenzoho) {
        const { handleZohoIntegration } = require("./handlers_zoho_crm");
        handleZohoIntegration(contact, tenantId,tokenzoho);
    } 
    */
  }

  const message = await db.message.create({
    "contactId": contact.id,
    "text": req.body.message,
    incoming: true,
    "tenantId": tenantId
  });

  const joinroom = "Tenant_" + tenantId;
  const newobjectmessage = {
    "contactId": contact.id,
    "text": req.body.message,
    incoming: true,
    createdAt: new Date()
  };

  if (newSettings.permissionall === "yes") {
    io.emit("new message", newobjectmessage);
  } else {
    const ownerID = contact.userId;
    const joinroomfinal = joinroom + "_USER_" + ownerID;
    io.emit("new message", newobjectmessage);
  }

  res.status(200).send({ message: newSettings });
};

module.exports = {
  IncomingMessageHandler
};
