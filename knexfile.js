const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      ssl      : settings.ssl,
      port     : settings.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
