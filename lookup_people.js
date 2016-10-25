const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

console.log('Searching...');

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query({
    text: "SELECT * FROM famous_people WHERE last_name=$1 OR first_name=$1",
    values: [input]
    }, (err, result) => {
      var person = result.rows[0];

      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found 1 person(s) by the name '${input}':`);
      console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
      client.end();
  });
});








