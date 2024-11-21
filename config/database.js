const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cururudb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
