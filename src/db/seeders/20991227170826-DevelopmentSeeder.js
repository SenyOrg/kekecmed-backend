'use strict';

var faker = require('faker/locale/de');

/**
 * Development Seeder
 *
 * !!! This seeder will be executed in development mode only !!!
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @type {{up: module.exports.up, down: module.exports.down}}
 */
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    var patients = [];

    for (var i = 0 ; i < 100 ; i++) {
      patients.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.random.arrayElement(['m', 'f']),
        birthDate: faker.date.past(30),
        insuranceUUID: faker.random.uuid(),
        insuranceId: 1,
        phone: faker.phone.phoneNumber(),
        mobile: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        street: faker.address.streetAddress(),
        no: faker.address.streetSuffix(),
        city: faker.address.city(),
        image: faker.image.avatar()
      });
    }

    return queryInterface.bulkInsert('Patients', patients);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
