const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});



function famousPeople(array) {
    array.forEach(function (person, index) {
        console.log(`-${index+1}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().split('T')[0]}'`);
    });
}


    client.connect((err) => {
        if (err) {
            return console.error("Connection Error", err);
        }
        client.query(`SELECT * FROM famous_people WHERE first_name = $1`, [process.argv[2]], (err, results) => {
            if (err) {
                return console.error("error running query", err);
            }
            //parsing date stamp javascript, 

            // console.log(result.rows);
            // console.log(`Found 1 person(s) by the name '${process.argv[2]}': \n -1: ${result.rows[1].first_name} ${result.rows[1].last_name}, born '${result.rows[1].birthdate}'`)
            console.log(`Found 1 person(s) by the name '${process.argv[2]}':`)
            famousPeople(results.rows);
            client.end();

        });
    });
