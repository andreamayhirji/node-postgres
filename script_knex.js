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


//-------------------- FUNCTIONS --------------------//
function famousPeople(array) {
    array.forEach(function (person, index) {
        console.log(`-${index+1}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().split('T')[0]}'`);
    });
}


//-------------------- CONNECTION USING KNEX --------------------//

knex
    .from('famous_people')
    .where('first_name', process.argv[2])
    // .where({
    //     first_name: process.argv[2]
    // }) // another way to write this, if it were to have more objects.
    .select('*')
    .asCallback(function (err, rows) {
        if (err) return console.error(err);
        famousPeople(rows)
    });

/* using .then and promise INSTEAD of a callback */
/* must have a .catch at the end, then we can keep chaining using the result from what .then ran */

// knex
//     .from('famous_people')
//     .where({
//         first_name: process.argv[2]
//     })
//     .select()
//     .then(function (rows) {
//         console.log(famousPeople(rows))
//     })

//     .catch(function (err) {
//         console.log("ERROR", err)
//     });