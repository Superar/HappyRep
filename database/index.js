const { Pool } = require('pg');

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: true
});

pool.query('SELECT NOW()', function(err, res){
    console.log(err, res);
    pool.end();
});
