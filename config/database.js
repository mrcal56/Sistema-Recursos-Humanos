const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    user: 'root',
    port: '3308',
    password: '',
    database: 'empleados'
});

pool.query = util.promisify(pool.query);
module.exports = pool;