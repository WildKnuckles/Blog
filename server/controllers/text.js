const cloudinary = require('../config/cloudinary');
const Post = require('../models/Post'); // ajuste o caminho conforme necessário
const User = require('../models/User'); // ajuste o caminho conforme necessário
const HttpError = require('../models/HttpError'); // ajuste o caminho conforme necessário

const createPost = async (req, res, next) => {
    try {
        let { title, category, desc } = req.body;
        if (!title || !category || !desc || !req.files) {
            return next(new HttpError("Preencha todos os campos e escolha uma imagem.", 422));
        }
        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Imagem demasiado grande. Deve ser menor que 2MB."));
        }

        // Carregar a imagem para o Cloudinary
        cloudinary.uploader.upload(thumbnail.tempFilePath, async (error, result) => {
            if (error) {
                return next(new HttpError("Erro ao fazer upload da imagem para o Cloudinary: " + error.message));
            }

            // Criar o post com a URL da imagem hospedada no Cloudinary
            const newPost = await Post.create({
                title,
                category,
                desc,
                thumbnail: result.secure_url,
                creator: req.user.id
            });

            if (!newPost) {
                return next(new HttpError("Post não pode ser criado.", 422));
            }

            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts + 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

            res.status(201).json(newPost);
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};

module.exports = createPost;
