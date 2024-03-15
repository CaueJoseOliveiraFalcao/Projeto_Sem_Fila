'use strict';
const bcrypt = require('bcrypt');

const DefaultPassword = 'C4u3j0s3'

bcrypt.hash(DefaultPassword , 10)
  .then(hash => {
    DefaultPassword = hash
  })
  .catch(err => {
    console.log(err)
  })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('stores' , [{
    cnpj : '12345678901234',
    password : DefaultPassword,
    name : 'adminStore',
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
