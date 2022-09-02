'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Items}) {
      // define association here
      this.hasMany(Items, {
        foreignKey: 'brand_id'
      })
    }
  }
  categories.init({
    category_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories'
  });
  return categories;
};