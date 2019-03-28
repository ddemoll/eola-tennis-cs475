var mysql = require('mysql');
var config = require('../../config/config.json');
var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool  = mysql.createPool({
      acquireTimeout: 20000,
      connectionLimit : 10,
      host            : config.devapi.host,
      user            : config.devapi.user,
      password        : config.devapi.password,
      database        : config.devapi.database
    });
      return pool;
    }
};
