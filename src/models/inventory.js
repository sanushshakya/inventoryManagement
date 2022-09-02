'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Items }) {
      // define association here
      this.belongsTo(Items, {
        foreignKey: 'item_id'
      })
    }
  }
  inventory.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventory'
  });
  return inventory;
};