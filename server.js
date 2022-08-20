require('dotenv').config()
const multer = require('multer')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const upload = multer({dest: 'uploads'})
const bcrypt = require('bcrypt')
const file = require('./models/file')
const File = require('./models/file')

mongoose.connect(process.env.DATABASE_URL)


app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/upload', upload.single('file'), async (req, res)=>{
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname, 
    }
    if(req.body.password != '' && req.body.password != null){
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }

    const file = await File.create(fileData)
    console.log(file)
    res.send(file.originalName)
})

app.listen(process.env.PORT)