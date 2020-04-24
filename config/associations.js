const {Post} = require('./../models/post');
const {Foto} = require('./../models/foto');
const {Comment} = require('./../models/comment');

Post.hasMany(Foto);
Foto.belongsTo(Post);

Post.hasMany(Comment);
Comment.belongsTo(Post);