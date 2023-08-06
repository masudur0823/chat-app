module.exports = (sequelize, DataTypes) => {
    const Templates = sequelize.define("templates", {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending"
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false
          },
       
      });
  
    return Templates;
  };


