//Importar librería Sequelize
const Sequelize = require('sequelize');

//Conectarse con la base de datos
const sequelize = new Sequelize('posts2','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

//Probar conexión
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:',err);
    });

//Exportar conexión
module.exports = { sequelize };