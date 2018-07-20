const {Pool} = require('pg');

const pool =
    new Pool({connectionString : process.env.DATABASE_URL, ssl : true});

module.exports = {
  query : function(text, values, ret_cb, err_cb) {
    pool.connect(function(err, client, done) {
    	console.log('err=', err);
    	console.log('client=', client);
        client.query(text, values).then(ret_cb).catch(err_cb);
    });
  }
};