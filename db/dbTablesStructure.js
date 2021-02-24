const {
    dbConnect
} = require("./dbConnect.js"),
    sequelize = dbConnect.sequelize,
    Sequelize = dbConnect.Sequelize;

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

const tables = {};
tables.Tags = Tags;
module.exports.dbTablesStructure = tables;