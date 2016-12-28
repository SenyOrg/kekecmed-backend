'use strict';

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

        var bulkInsert = queryInterface.bulkInsert;

        // EventStatuses
        queryInterface.bulkInsert('EventStatuses', [{
            title: 'Geplant',
            color: '',
        }, {
            title: 'Ausführend',
            color: '',
        }, {
            title: 'Verschoben',
            color: '',
        }, {
            title: 'Verworfen',
            color: '',
        }, {
            title: 'Beendet',
            color: '',
        },]);

        queryInterface.bulkInsert('Insurances', [{
            title: 'BKK',
            website: 'http://www.bkk.de',
            image: null
        }])

        // EventTypes
        return queryInterface.bulkInsert('EventTypes', [{
            title: 'Sprechstunde',
            color: '',
            description: 'Sprechstunde'
        }, {
            title: 'Blutabnahme',
            color: '',
            description: 'Blutabnahme'
        }, {
            title: 'Impfung',
            color: '',
            description: 'Impfung'
        }, {
            title: 'Überweisung',
            color: '',
            description: 'Überweisung'
        },]);
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
