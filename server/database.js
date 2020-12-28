const mysql = require('mysql2/promise');

let conn ;

async function connect() {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'eolicplants'
    });
    console.log("=> Connected to MySQL");

    await initializeDDBB();
    await populateDDBB();
    await disconnect();

    // await conn.execute(
    //     'INSERT INTO plants SET firstName = ?, lastName = ?',
    //     ['Jack', 'Bauer']
    // );
    // console.log("Customer inserted");
}

async function initializeDDBB(){
    console.log("=> Drop table plants if exists");
    await conn.execute("drop table IF EXISTS plants");

    console.log("=> Creating table plants");
    await conn.execute("create table plants(id serial, city varchar(255) not null, progress int default 0 not null, completed boolean default false not null, planning varchar(255) null);");

    console.log("=> Creating index for table plants");
    await conn.execute("create unique index plants_id_uindex on plants (id);");

    console.log("=> Creating PK constraint to table plants");
    await conn.execute("alter table plants add constraint plants_pk primary key (id);");
}

async function populateDDBB(){
    console.log("=> Inserting one plant");
    await conn.execute("INSERT INTO plants (city, progress, completed, planning) VALUES ('Madrid',100,true,'madrid-sunny-flat')")
}

async function disconnect(){
    await conn.close();
    console.log("=> Connection closed");
}



module.exports = { connect, disconnect }