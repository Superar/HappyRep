const {Pool} = require('pg');

const pool =
    new Pool({connectionString : 'postgres://azjpybnuyzhimq:82b1e0fa05f5b214af1d66cbf4df1310d263a72e416020d35bd7bbdbd9cd9feb@ec2-54-83-59-120.compute-1.amazonaws.com:5432/ddr7p1o9hk1i54', ssl : true});

module.exports = {
  query : function(text, values, ret_cb, err_cb) {
    pool.connect(function(err, client, done) {
        client.query(text, values).then(ret_cb).catch(err_cb);
    });
  }
};

