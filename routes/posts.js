var express = require('express');
var router = express.Router();

const postsController = require('./../controllers/posts');


router.get('/', postsController.posts);

router.get('/nuevo', postsController.nuevoPost);
router.post('/nuevo', postsController.nuevoPostPost);

router.get('/editar/:id', postsController.editarPost);
router.post('/editar', postsController.editarPostPost);

router.post('/delete/:id', postsController.delete);

router.post('/agregarfoto', postsController.agregarFoto);

router.get('/detalle/:id', postsController.detallePost);

router.post('/addcomment', postsController.addComment);



module.exports = router;