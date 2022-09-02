'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Brands, Categories, OrderLinesItems, OrderLines, Inventory}) {
      // define association here
      this.belongsTo(Brands, {
        foreignKey: 'brand_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })

      this.belongsTo(Categories, {
        foreignKey: 'category_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })

      this.hasOne(Inventory, {
        foreignKey: 'item_id'
      })

      this.belongsToMany(OrderLines,{
        through: OrderLinesItems,
        foreignKey: "item_id"
      })
    }
  }
  items.init({
    category_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'categories'
        },
        key: 'id'
      }
    },
    brand_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'brands'
        },
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sku_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Items',
    tableName: 'items'
  });
  return items;
};