module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define("tenant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          suscription: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'inactive', // Values active, inactive, test
        },
        RegisterTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }
    });
  
    return Tenant;
  };