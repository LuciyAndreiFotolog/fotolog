require('../config/db.config');

const faker = require('faker');
const mongoose = require('mongoose');
const Log = require('../models/log.model');
const User = require('../models/user.model');

mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase()
      .then(() => {
        console.log('Database cleared')
      })
      .then(() => {

        const usersToCreate = [];

        for (let i = 0; i < 20; i++) {
          const user = {
            email: faker.internet.email(),
            username: faker.name.firstName(),
            password: 'fakepassword',
            avatar: faker.image.avatar()
          }

          usersToCreate.push(user);
        }
          return User.create(usersToCreate)
      })
      .then((users) => {
        const logsToCreate = [];

        users.forEach((user) => {
          console.log(user.email)

          for (let j = 0; j < 9; j++) {
            const log = {
              title: faker.lorem.sentence(),
              image: faker.image.image(),
              owner: user._id
            }
            logsToCreate.push(log);
          }
        })
          return Log.insertMany(logsToCreate)
      })
      .then((logs) => {
        logs.forEach((log) => {
          console.log(`${log.title} created by ${log.owner}`)
        })
      })
      .catch(e => console.error(e))
      .finally(() => {
        mongoose.connection.close()
          .then(() => console.log('Finished seeds.js'))
          .catch((e) => console.error(e))
          .finally(() => {
            process.exit(0)
          })
      })
})