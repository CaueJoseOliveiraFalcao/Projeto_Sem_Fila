'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        type : Sequelize.STRING(14),
        allowNull : false,
        unique : true
      },
      password: {
        type :  Sequelize.STRING(300),
        allowNull : false
      },
      name: {
        type : Sequelize.STRING(100),
        allowNull : false
      },
      imgProfile: {
        type : Sequelize.STRING(300),
        allowNull:true
      },
      store_desc: {
        type : Sequelize.STRING(500),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  }
};