'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    id: DataTypes.INTEGER,
    cnpj: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    imgProfile: DataTypes.STRING,
    store_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};