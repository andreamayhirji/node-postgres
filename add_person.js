const settings = require("./settings"); // settings.json

const knex = require("knex")({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});

//make knex a variable so you can call it later as just query.
const query = knex
    .from('famous_people')
    .insert(
        { first_name: process.argv[2],
        last_name: process.argv[3],
        birthdate: process.argv[4]}
    )
    //debug your knex logic by printing the built query.
    // console.log(query.toString());       
    query.asCallback(function (err, rows) {
        if (err) return console.log('error', err);
        console.log(rows)
    })