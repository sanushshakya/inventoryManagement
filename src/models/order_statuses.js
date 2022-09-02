'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({OrderLines}) {
      // define association here
      this.hasMany(OrderLines,{
        foreignKey: 'order_status_id'
      })
    }
  }
  order_statuses.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OrderStatuses',
    tableName: 'order_statuses'
  });
  return order_statuses;
};