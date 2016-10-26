const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];
const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    ssl      : settings.ssl,
    port     : settings.port
  }
});

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: date}).then(result => console.log(result));
knex.destroy();
