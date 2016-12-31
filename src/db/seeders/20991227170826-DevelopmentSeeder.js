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
    up: function (queryInterface, Sequelize, done) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('Person', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */

        // DataSets
        var patients = [];
        var users = [];
        var notes = [];
        var tasks = [];
        var noteReferences = [];
        var taskReferences = [];
        var taskAssignees = [];
        var calendars = [];
        var events = []
        var eventParticipants = [];

        // 10
        for (var i = 0 ; i < 10 ; i++) {
            calendars.push({
                title: 'Calendar ' + i,
                color: '#f1f2f3',
                creatorId: faker.random.number({min: 1, max: 100}),
                description: faker.lorem.sentence(),
                shared: 1,
                scopes: '{}'
            });
        }

        // 100
        for (var i = 0; i < 100; i++) {
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

            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                gender: faker.random.arrayElement(['m', 'f']),
                birthDate: faker.date.past(30),
                phone: faker.phone.phoneNumber(),
                mobile: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                street: faker.address.streetAddress(),
                no: faker.address.streetSuffix(),
                city: faker.address.city(),
            });
        }

        // 1000
        for (var i = 0 ; i < 1000 ; i++) {
            notes.push({
                title: faker.lorem.sentence(),
                body: faker.lorem.sentence(),
                authorId: faker.random.number({min: 1, max: 100})
            });

            tasks.push({
               title: faker.lorem.sentence(),
                description: faker.lorem.sentence(),
                deadline: faker.date.future(1),
                statusId: faker.random.number({min: 1, max: 4}),
                creatorId: faker.random.number({min: 1, max: 100})
            });

            events.push({
                title: faker.lorem.sentence(),
                description: faker.lorem.sentence(),
                calendarId: faker.random.number({min: 1, max: 10}),
                eventTypeId: faker.random.number({min: 1, max: 4}),
                creatorId: faker.random.number({min: 1, max: 100}),
                patientId: faker.random.number({min: 1, max: 100}),
                eventStatusId: faker.random.number({min: 1, max: 5}),
                start: faker.date.future(),
                end: faker.date.future()
            });
        }

        // 10000
        for (var j = 0 ; j < 10000 ; j++) {
            noteReferences.push({
                noteId:  faker.random.number({min: 1, max: 1000}),
                objectId: faker.random.number({min: 1, max: 100}),
                objectType: 'Patient'
            });

            taskReferences.push({
                taskId:  faker.random.number({min: 1, max: 1000}),
                objectId: faker.random.number({min: 1, max: 100}),
                objectType: 'Patient'
            });

            taskAssignees.push({
                taskId: faker.random.number({min: 1, max: 1000}),
                userId: faker.random.number({min: 1, max: 100})
            });

            eventParticipants.push({
                eventId: faker.random.number({min: 1, max: 1000}),
                participantId: faker.random.number({min: 1, max: 100}),
            })
        }

        queryInterface.bulkInsert('Users', users).then(() => {
            queryInterface.bulkInsert('Patients', patients);
            queryInterface.bulkInsert('Notes', notes).then(() => {
                queryInterface.bulkInsert('NoteReferences', noteReferences);
            });

            queryInterface.bulkInsert('Tasks', tasks).then(() => {
                queryInterface.bulkInsert('TaskReferences', taskReferences);
                queryInterface.bulkInsert('TaskAssignees', taskAssignees);
            });

            queryInterface.bulkInsert('Calendars', calendars).then(() => {
                queryInterface.bulkInsert('Events', events).then(() => {
                    queryInterface.bulkInsert('EventParticipants', eventParticipants);
                    return done();
                });
            });
        });
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
