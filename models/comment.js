//Importar librería Sequelize
const Sequelize = require('sequelize');
const {sequelize} = require('../config/db');

const Model = Sequelize.Model;
class Comment extends Model {}
Comment.init({
  // attributes
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  texto: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'comment'
  // options
});



//Exportar modelo
module.exports = { Comment };