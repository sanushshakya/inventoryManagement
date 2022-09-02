'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brands extends Model {
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
  brands.init({
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Brands',
    tableName: 'brands'
  });
  return brands;
};