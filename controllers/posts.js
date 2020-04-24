const {Post} = require('./../models/post');
const {Foto} = require('./../models/foto');
const {Comment} = require('./../models/comment');
let controller = {};


controller.posts = (req, res, next) => {

    (async () => {
        try {
            let posts = await Post.findAll({
                include: [Foto,Comment]
            });
            //Primer parámetro: archivo a mostrar como html
            // - Omitir /views/ al inicio
            // - Omitir .ejs al final
            //Segundo parámetro: objeto con variables para la vista
            res.render('posts/main', {
                titulo: 'Posts',
                posts: posts,
             
            });
            
        } catch (err) {
            console.error('Error en la consulta de posts', err);
            res.render('posts/main', {
                titulo: 'Posts',
                posts: [],
                

            });
        }

    })();

};

controller.nuevoPost = (req, res, next) => {
    res.render('posts/form');
};

controller.nuevoPostPost = (req, res, next) => {
    (async () => {
        try {
            //La información de un form viene desde req.body

            //Extraer valores de form
            let nombre = req.body.nombre;
            let texto = req.body.texto;

            

            //Objeto con la estructura del modelo
            let postACrear = {
                nombre: nombre,
                texto: texto
            };

            await Post.create(postACrear);

            //Redireccionar a una URL
            res.redirect('/');
        } catch (err) {
            console.error('Error al crear post', err);
            res.render('posts/form');
        }
    })();
};

controller.editarPost = (req, res, next) => {
    (async () => {
        try {


            //Extraer id desde url
            let id = req.params.id;

            //Buscar por id
            let post = await Post.findByPk(id);

            //Buscar por otros campos
            // let post = await Post.findByOne({
            //     where: {
            //         nombre: 'Mochila'
            //     }
            // });

            res.render('posts/form', {
                id: post.id,
                nombre: post.nombre,
                texto: post.texto,
            });
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};

controller.editarPostPost = (req, res, next) => {
    (async () => {
        try {
            let id = req.body.id;
            let nombre = req.body.nombre;
            let texto = req.body.texto;

            //TODO: validar campos

            let post = await Post.findByPk(id);

            post.nombre = nombre;
            post.texto = texto;

            await post.save();

            res.redirect('/');
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};

controller.delete = ( req, res, next) =>{
    let id = req.params.id;


    //DELETE 
    Post.destroy({
        where:{
            id:id
        }
    }) .then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.error('Error trying to delete Post', err);
        res.redirect('/');
    });
};

controller.agregarFoto = (req, res, next) => {
    (async () => {
        try {
            let id = req.body.id;  
            let url = req.body.url;

            //Crear objeto con estructura de modelo
            let foto = {
                url: url,

                //Relación con el producto al que corresponde
                postId: id     
            }

            await Foto.create(foto);

            res.redirect('/detalle/' + id);
        } catch (err) {
            
        }
    })();
};

controller.detallePost = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;

            let post = await Post.findByPk(id);

            let fotos = await post.getFotos();

            res.render('posts/detalle', {
                post: post,
                fotos: fotos
            });
            
        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('posts/detalle', {
                post: {},
                fotos: []
            });
        }
    })();
};


controller.addComment = (req,res,next) =>{
    (async () => {
        try {
            let id = req.body.id;         
            let nombre = req.body.nombre;
            let texto = req.body.texto;

            

  
            let commentACrear = {
                nombre: nombre,
                texto: texto,
                postId: id     
            };

            await Comment.create(commentACrear);

           res.redirect('/');
        } catch (err) {
            console.error('Error en comments', err);
            res.redirect('/');
        }
    })();
};

module.exports = controller;