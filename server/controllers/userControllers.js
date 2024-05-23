const HttpError = require("../models/errorModel")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const fs = require ('fs')
const path = require ('path')
const {v4: uuid} = require("uuid")
const nodemailer = require("nodemailer")
// =================================== Register a new user
// POST : api/users/register
//UNPROTECTED
const registerUser = async (req, res, next) => {
    try{
        const{name, email, password, password2} = req.body;
        if(!name || !email || !password){
            return next(new HttpError("Preencha todos os campos.", 422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Este email já existe.", 422))
        }

        if((password.trim()).length < 6){
            return next(new HttpError("Senha deve conter pelo menos 6 carácteres.",422))
        }

        if(password != password2){
            return next(new HttpError("As senhas não combinam"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPass})
        res.status(201).json(`New User ${newUser.name} registered.`)

    } catch (error){
        return next(new HttpError("Registro falhado."))
    }
}





// =================================== Forget Password
// POST : api/users/forget-password
//UNPROTECTED
const forgetPass = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return next(new HttpError("Usuário inexistente", 422));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jonataosacapia@gmail.com',
                pass: 'ubje jivr jxst yxcb'
            }
        });

        var mailOptions = {
            from: 'jonataosacapia@gmail.com',
            to: 'semanadalinguaportuguesa@gmail.com',
            subject: 'Recuperação de Senha.',
            text: `Link para redefinir a senha: 
            https://cniilp-ao-client.vercel.app/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                return next(new HttpError('Erro ao enviar o email.', 500));
            } else {
                // Agora que o e-mail foi enviado com sucesso, podemos enviar a resposta.
                try {
                    await res.status(200).json({ token });
                } catch (err) {
                    console.log(err);
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next(new HttpError('Erro interno do servidor.', 500));
    }
};








// =================================== Login a registered user
// POST : api/users/login
//UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Preencha todos os campos.",422))
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail})
        if(!user){
            return next(new HttpError("Credênciais inválidas. *verifique o Email",422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            return next(new HttpError("Credências inválidas. *verifique a Senha", 422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})    
        
    } catch (error) {
        return next(new HttpError("Login falhado. Por favor verifique as suas credênciais.",422))
    }
}







// =================================== User Profile
// POST : api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password')
        if(!user){
            return next(new HttpError("Usuário não encontrado", 404))
        }
        res.status(200).json(user); 
    } catch (error) {
        return next(new HttpError(error))
    }
}








// =================================== Change User Avatar
// POST : api/users/change-avatar
//PROTECTED
const changeAvatar = async (req, res, next) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Por favor escolha uma imagem.",422))
        }

        // find user from database
        const user = await User.findById(req.user.id)
        // delete old avatar if exists 
        if(user.avatar){
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files;
        //check file size
        if(avatar.size > 500000) {
            return next(new HttpError("Imagem demasiado grande. deve ser menor do que 500kb", 422))
        }

        let fileName;
        fileName = avatar.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if(err){
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename}, {new: true})
            if(!updatedAvatar){
                return next(new HttpError("O Avatar não pode ser alterado.",422))
            }
            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}








// =================================== Edit User Details (from profile)
// POST : api/users/edit-user
//PROTECTED
const editUser = async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
        if (!name || !email || !currentPassword || !newPassword){
            return next(new HttpError("Preencha todos os campos.", 422))
        }

        //get user from database
        const user = await User.findById(req.user.id);
        if(!user){
            return next (new HttpError("Usuários não encontrado.", 403))
        }

        // make sure new email doens't already exist
        const emailExist = await User.findOne({email})
        if(emailExist && (emailExist._id != req.user.id)){
            return next(new HttpError("Este email já existe.", 422))
        }
        // compare current password to db password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if(!validateUserPassword){
            return next(new HttpError("Senha antiga incorrenta", 422))
        }
        // compare new passwords
        if(newPassword !== confirmNewPassword){
            return next(new HttpError("As novas senhas não combinam.", 422))
        }

        // hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        //update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)
    } catch (error) {
        
    }
}










const editPassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const { token } = req.params; // Suponho que o token esteja no cabeçalho

        if (!newPassword) {
            return next(new HttpError("Preencha todos os campos.", 422));
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return next(new HttpError("Erro na verificação do token.", 401));
            }

            try {
                // hash new password
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newPassword, salt);

                //update user info in database
                const newInfo = await User.findByIdAndUpdate(decoded.id, { password: hash }, { new: true });
                res.status(200).json(newInfo);
            } catch (error) {
                console.log(error);
                return next(new HttpError("Erro ao atualizar a senha.", 500));
            }
        });
    } catch (error) {
        console.log(error);
        return next(new HttpError("Erro interno do servidor.", 500));
    }
};









// =================================== Get Auhtors
// POST : api/users/authors
//UNPROTECTED
const getAuthors = async (req, res, next) => {
   try {
     const authors = await User.find().select('-password');
     res.json(authors);
   } catch (error) {
    return next(new HttpError(error))
   }
}



module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, editPassword, forgetPass, getAuthors}


