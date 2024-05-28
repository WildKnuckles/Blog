const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose');
require('dotenv').config()
const upload = require('express-fileupload')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const userModel = require('./models/userModel');
const HttpError = require('./models/errorModel');

const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "https://cniilp-ao-client.vercel.app"}))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes) 

app.use(notFound)
app.use(errorHandler)
 
 
 
 
 
 // Configuração do Multer para salvar arquivos na pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/upload', upload.single('file'), (req, res) => {
    res.send({ message: 'File uploaded successfully', file: req.file });
  });

connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 5000, () => console.log(`Server started on port ${process.env.PORT}`))).catch(error =>{console.log(error)})



