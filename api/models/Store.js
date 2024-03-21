'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      Store.hasMany(models.User , {as : 'users' , foreignKey : 'storeid'});
    }
  }
  Store.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Especifica o id como a chave primária
      autoIncrement: true // Presume-se que o id é autoincrementável
    },
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
