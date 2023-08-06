const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// here goes models
// users, contacts, companies, settings
db.message = require("./messages.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.tenants = require("./tenants.model.js")(sequelize, Sequelize);
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.numbers = require("./numbers.model.js")(sequelize, Sequelize);
db.settings = require("./settings.model.js")(sequelize, Sequelize);
db.templates = require("./templates.model.js")(sequelize, Sequelize);

//users
db.tenants.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});
//templates
db.tenants.hasMany(db.templates, { as: "templates" });
db.templates.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});

//contacts
db.tenants.hasMany(db.contacts, { as: "contacts" });
db.contacts.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});
// messages
db.tenants.hasMany(db.message, { as: "messages" });
db.message.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});

// numbers
db.tenants.hasMany(db.numbers, { as: "numbers" });
db.numbers.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});
/*
// settings
db.tenants.hasMany(db.settings, { as: "settings" });
db.settings.belongsTo(db.tenants, {
  foreignKey: "tenantId",
  as: "tenant",
});
*/

db.contacts.hasMany(db.message, { as: "messages" });
db.message.belongsTo(db.contacts, {
  foreignKey: "contactId",
  as: "contacts",
});

//contacts
db.users.hasMany(db.contacts, { as: "contacts" }); 
db.contacts.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

db.users.hasMany(db.message, { as: "messages" });
db.message.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});
module.exports = db;