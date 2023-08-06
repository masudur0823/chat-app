module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("messages", {
        text: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sense: {
            type: DataTypes.STRING,
            allowNull: true
          },
          createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
          },
          incoming: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          channel: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Whatsapp"
          },
      });
  
    return Message;
  };


