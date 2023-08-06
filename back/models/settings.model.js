module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define("setting", {
        permissionall: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "yes", // values yes no
          },
          communicationmode: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unofficial",
          }, // values Unofficial / Official
        asignacion: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Admin",
        },
          tenantID: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },  
          zohointegration: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          schoolintegration: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          facebookintegration: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          tokenwp: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          tokenfb: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          tokenschool: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
          tokenzoho: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
    });
  
    return Setting;
  };