const { Sequelize } = require('sequelize');

// Criação da instância Sequelize com os parâmetros de conexão
const sequelize = new Sequelize('cururudb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Desativa os logs SQL
});

// Tentando autenticar a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

// Exporta o objeto Sequelize para ser utilizado nos modelos
module.exports = sequelize;
