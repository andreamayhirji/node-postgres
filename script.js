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


//-------------------- FUNCTIONS --------------------//
function famousPeople(array) {
    array.forEach(function (person, index) {
        console.log(`-${index+1}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().split('T')[0]}'`);
    });
}

//-------------------- CONNECTION TO SQL --------------------//
    client.connect((err) => {
        if (err) {
            return console.error("Connection Error", err);
        }
        client.query(`SELECT * FROM famous_people WHERE first_name = $1`, [process.argv[2]], (err, results) => {
            if (err) {
                return console.error("error running query", err);
            }
            let person = results.rows;
            console.log(`Found ${person.length} person(s) by the name '${process.argv[2]}':`)
            //callback from famousPeople function and using results.rows as the paramater to loop through.
            famousPeople(results.rows);
            client.end();

        });
    });
