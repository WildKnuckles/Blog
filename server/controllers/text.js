const { exec } = require('child_process');
const path = require('path');
const uuid = require('uuid').v4; // certifique-se de ter o uuid instalado
const Post = require('../models/Post'); // substitua com o caminho correto para o seu modelo de Post
const User = require('../models/User'); // substitua com o caminho correto para o seu modelo de User
const HttpError = require('../models/HttpError'); // substitua com o caminho correto para o seu modelo de HttpError

const createPost = async (req, res, next) => {
    try {
        let {title, category, desc} = req.body;
        if (!title || !category || !desc || !req.files) {
            return next(new HttpError("Preencha todos os campos e escolha uma imagem.", 422));
        }
        const {thumbnail} = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Imagem demasiado grande. Deve ser menor que 2MB."));
        }

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

        // Define the path to the Git repository's directory
        let gitRepoPath = path.join(__dirname, '..', '..', 'server/uploads'); // substitua 'nome-do-repositorio' pelo nome da sua pasta do repositório
        let uploadPath = path.join(gitRepoPath, 'uploads', newFilename);

        thumbnail.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                const newPost = await Post.create({title, category, desc, thumbnail: newFilename, creator: req.user.id});
                if (!newPost) {
                    return next(new HttpError("Post não pode ser criado.", 422));
                }

                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount});

                // Add and commit the new file to the Git repository
                exec(`cd ${gitRepoPath} && git add uploads/${newFilename} && git commit -m "Add new image ${newFilename}" && git push`, (gitErr, stdout, stderr) => {
                    if (gitErr) {
                        return next(new HttpError(`Erro ao fazer commit no Git: ${gitErr.message}`));
                    }
                    res.status(201).json(newPost);
                });
            }
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};
