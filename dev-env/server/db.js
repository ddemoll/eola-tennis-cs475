var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool  = mysql.createPool({
      acquireTimeout: 20000,
      connectionLimit : 10,
      host            : 'localhost',
      user            : 'root',
      password        : 'Federer20',
      database        : 'eolatennis'
    });
      return pool;
    }
};
