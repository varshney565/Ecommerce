/**
 * This file will have db related information.
 */

module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "0000",
    dialect : "mysql",
    DB : "ecommerce_db",
    pool : {
        min : 0,
        max : 5, //maximum connection possible at any time(at peak time).
        acquire : 30000, //maximum time client has to wait before aborting a connection.
        idle : 1000
    }
};