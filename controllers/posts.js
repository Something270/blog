const {Post} = require('./../models/post');

let controller = {};


controller.posts = (req, res, next) => {

    (async () => {
        try {
            let posts = await Post.findAll();
            //Primer parámetro: archivo a mostrar como html
            // - Omitir /views/ al inicio
            // - Omitir .ejs al final
            //Segundo parámetro: objeto con variables para la vista
            res.render('posts/lista', {
                titulo: 'Posts',
                posts: posts
            });
            
        } catch (err) {
            console.error('Error en la consulta de posts', err);
            res.render('posts/lista', {
                titulo: 'Posts',
                posts: []
            });
        }

    })();

};

controller.nuevoPost = (req, res, next) => {
    res.render('posts/formulario');
};

controller.nuevoPostPost = (req, res, next) => {
    (async () => {
        try {
            //La información de un formulario viene desde req.body

            //Extraer valores de formulario
            let nombre = req.body.nombre;
            let texto = req.body.texto;

            //TODO: Validar valores

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
            res.render('posts/formulario');
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

            res.render('posts/formulario', {
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

module.exports = controller;