module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define("contact", {
        last_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        tel: {
          type: DataTypes.STRING,
          allowNull: true
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true
          },
          lastAccess: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
          },
          channel: {
            type: DataTypes.STRING,
            allowNull: true
          },
      });
  
    return Contacts;
  };


