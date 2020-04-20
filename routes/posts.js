var express = require('express');
var router = express.Router();

const postsController = require('./../controllers/posts');

router.get('/', postsController.posts);

router.get('/nuevo', postsController.nuevoPosts);
router.post('/nuevo', postsController.nuevoPostPost);

router.get('/editar/:id', postsController.editarPost);
router.post('/editar', postsController.editarPostPost);

module.exports = router;