const Sequelize = require('sequelize');
/* Connection to database */
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});
let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports.dbConnect = db;