const fs = require("fs");
const path = require('path');
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const multer = require("multer");
const searchImg = async (req, res) => {
    const userId = req.body.userId;
    const id = userId;
    console.log(userId);
    const directory = path.join(__dirname, 'public');

    fs.readdir(directory, async (err, arq) => {
        if (err) {
            return res.json({ msg: err });
        }

        const img = arq.find(file => file.startsWith(userId)); // Encontra o nome do arquivo
        if (!img) {
            return res.status(422).json({ msg: 'imagem não encontrada' });
        }

        try {
            const user = await db.Store.findOne({
                where: { id }
            });
            if (user) {
                user.imgProfile = `http://localhost:8082/${img}`; // Atualiza o campo de imagem do usuário
                await user.save(); // Salva as alterações no banco de dados
            } else {
                return res.status(422).json({ msg: 'usuário não encontrado' });
            }
            return res.status(200).json({ msg: `http://localhost:8082/${img}` });
        } catch (err) {
            return res.status(422).json({ msg: err.message });
        }
    });
}

const upload = async (req,res) =>{
    const token = req.headers.authorization;

    const decoded = jwt.verify(token , process.env.TOKEN);
    const userId = decoded.id;
        const storage = multer.diskStorage({
            destination : function(req , file ,cb) {
                cb(null , `${__dirname}/public`)
            },
            filename : function(req ,file , cb) {
                cb(null , `${userId}` + ".jpg");
            }
        })

        const upload = multer({storage}).single("file");

        upload(req , res , function(err) {
            if (err instanceof multer.MulterError){
                res.status(500).send(err)
            }
            else if (err){

            }
            res.status(200).json({msg : 'imagem enviada'})
        })
    }

module.exports = {upload , searchImg};