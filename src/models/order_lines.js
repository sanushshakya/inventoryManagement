'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_lines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Items, OrderLinesItems, Vendors, OrderStatuses }) {
      // define association here
      this.belongsToMany(Items, {
        through: OrderLinesItems,
        foreignKey: 'order_line_id'
      })

      this.belongsTo(Vendors, {
        foreignKey: 'vendor_id'
      })

      this.belongsTo(OrderStatuses, {
        foreignKey: 'order_status_id'
      })
    }
  }
  order_lines.init({
    vendor_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'vendors'
        },
        key: 'id'
      }
    },
    order_status_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'order_statuses'
        },
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderLines',
    tableName: 'order_lines',
  });
  return order_lines;
};