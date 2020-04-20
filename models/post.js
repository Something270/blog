//Importar librería Sequelize
const Sequelize = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;
class Post extends Model {}
Post.init({
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
  modelName: 'post'
  // options
});



//Exportar modelo
module.exports = { Post };