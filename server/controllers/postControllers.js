const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')





// ======================================= Create a Post
//POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        let {title, category, desc} = req.body;
        if(!title || !category || !desc || !req.files){
            return next(new HttpError("Preencha todos os campos e escolha uma imagem.", 422))
        }
        const {thumbnail} = req.files;
        // check the file size
        if(thumbnail.size > 2000000){
            return next(new HttpError("Imagem demasiado grande. Deve ser menor que 2MB."))
        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length -1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if(err){
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({title, category, desc, thumbnail: newFilename, creator: req.user.id})
                if(!newPost) {
                    return next(new HttpError("Post não pode ser criado.", 422))
                }
                // find user and increate post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}









// ======================================= Get all Posts
//GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}









// ======================================= Get single Post
//GET : api/posts/:ID
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post não encontrado.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    } 
}









// ======================================= GET POSTS BY CATEGORY
//GET : api/posts/categories/category
// UNPROTECTED
const getCatPost = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}








// ======================================= Get authors Post
//GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
        
    } catch (error) {
        return next(new HttpError(error))
    }
}









// ======================================= EDIT POST
//PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedPost;

        const postId = req.params.id;
        let {title, category, desc} = req.body;
        //ReactQuill has a paragraph opening and closing tag with a break tag in between so there ara 11 characters in there already
        if(!title || !category || desc.length < 12){
            return next(new HttpError("Preencha todos os campos.", 422))
        }

         // get old post from database
         const oldPost = await Post.findById(postId);
         if(req.user.id == oldPost.creator){
        if(!req.files){
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, desc}, {new: true})
        } else {
           
            // delete old thumbnail from upload
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if(err){
                    return next(new HttpError(err))
                }
            })
            // upload new thumbnail
            const {thumbnail} = req.files;
            // check file size
            if(thumbnail.size > 20000000){
                return next(new HttpError("Imagem demasiado grande. Deve ser menor que 2MB."))
            }
            let fileName = thumbnail.name;
            let splittedFilename = fileName.split('.')
            let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length -1]
            thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
                if(err){
                    return next(new HttpError(err))
                }
            })
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, desc, thumbnail: newFilename}, {new: true})

    }
}
        if(!updatedPost){
            return next(new HttpError("A atualização falhou.", 400))
        }

        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError(error))
    }
}









// ======================================= DELETE POST
//Delete : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId){
            return next(new HttpError("Post indisponível."), 400)
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        if(req.user.id == post.creator){
        // delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err){
                return next(new HttpError(err))
            } else {
                await Post.findByIdAndDelete(postId);
                // find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts -1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.json(`Post ${postId} deletado com sucesso.`)
            }
        })
    } else {
        return next(new HttpError("Post não pode ser deletado.", 403))
    }
    } catch (error) {
        return next(new HttpError(error))
    }
}



module.exports = {createPost, getPosts, getPost, getCatPost, getUserPosts, editPost, deletePost}