'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_lines_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Items, OrderLines }) {
      // define association here
      this.belongsTo(Items, {
        foreignKey: 'item_id'
      })
      this.belongsTo(OrderLines, {
        foreignKey: 'order_line_id'
      })
    }
  }
  order_lines_items.init({
    order_line_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'order_lines'
        },
        key: 'id'
      }
    },
    item_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'items'
        },
        key: 'id'
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT.UNSIGNED
    },
    order_quantity: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    received_quantity: {
      allowNull:false,
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'OrderLinesItems',
    tableName: 'order_lines_items',
  });
  return order_lines_items;
};