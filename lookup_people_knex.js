const input = process.argv[2];
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

console.log('Searching...');

knex.select().from('famous_people')
.where('first_name', input)
.orWhere('last_name', input)
.timeout(1000).asCallback((err, result) => {
    var person = result[0];
    var day = person.birthdate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = person.birthdate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = person.birthdate.getFullYear();

    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found 1 person(s) by the name '${input}':`);
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${year}-${month}-${day}'`);
    knex.destroy();
  });









