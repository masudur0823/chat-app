module.exports = (sequelize, DataTypes) => {
    const Number = sequelize.define("number", {
        number: {
            type: DataTypes.STRING,
            allowNull: false
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Inactive',
          } // values Inactive / Active
    });
  
    return Number;
  };