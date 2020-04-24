// Importar librería Sequelize
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Importar conexión a base de datos
const { sequelize } = require('./../config/db');

// Crear modelo
class Foto extends Model {}
Foto.init({
    //Definir campos del modelo
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'foto'
});

// Exportar modelo
module.exports = { Foto };