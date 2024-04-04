const { query } = require("express");
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const upload = async (req,res) =>{
        const userId = req.body.userId;
        console.log(userId);
        const storage = multer.diskStorage({
            destination : function(req , file ,cb) {
                cb(null , `${__dirname}/public`)
            },
            filename : function(req ,file , cb) {
                cb(null , Date.now() + ".jpg");
            }
        })

        const upload = multer({storage}).single("file");

        upload(req , res , function(err) {
            if (err instanceof multer.MulterError){
                res.status(500).send(err)
            }
            else if (err){

            }
            console.log(req.file.filename);
            res.status(200).send('foi')
        })
    }
const  register = async (req,res) =>{
    
    if (!req.body){
        return res.status(422).json({msg: 'Entrada Vazia'})
    }
    const {name , cnpj , password , imgProfile , store_desc} = req.body
    console.log(imgProfile);
    if (!name){
            return res.status(422).json({msg: 'nome obrigatorio'})
        }
    if (!cnpj){
            return res.status(422).json({msg: 'cnpj obrigatorio'})
        }
    if (!password){
            return res.status(422).json({msg : 'senha obrigatorio'})
        }

    try{
        const ExistCnpj = await db.Store.findOne({
            where : {cnpj}
        });
        if(ExistCnpj){
            console.log('cnpj ja existe');
            return res.status(422).json({msg : 'cnpj existente'});
        }

        await db.Store.create({
            name,
            cnpj,
            password : await bcrypt.hash(password , 10),
            imgProfile,
            store_desc
        });
        const user = await db.Store.findOne({
            where : {cnpj}
        });
        const userId = user.id


    }catch(error) {
        return res.status(422).json({msg : error});
    }}

    
 const login = async (req,res) =>{
    try{
        const {cnpj , password} = req.body;

        const user = await db.Store.findOne({
            where : {cnpj}
        })
        if (!user){
            return res.status(422).json({msg : 'usuario nao existe'});
        }
        const passWordIsValid = await bcrypt.compare(password , user.password);
        if(!passWordIsValid){
            return res.status(422).json({msg : 'Senha incorreta'});
        }

        const token = jwt.sign({id : user.id} , process.env.TOKEN , {
            expiresIn : process.env.JWT_REFRESH_EXPIRATION
        });
        const data = {
            id : user.id,
            cnpj : user.cnpj,
            name : user.name,
            imgProfile : user.imgProfile,
            store_desc : user.store_desc,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        }
        res.status(200).send({
            accessToken : token,
            data : data
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : error});
    }
} 
 const  refresh = (req,res) =>{
    const token = req.headers.authorization;

    if (!token){
        return res.status(422).json({msg : 'token nao fornecido corretamente'});
    }
    try{
        const decoded = jwt.verify(token , process.env.TOKEN);
        res.status(200).send({
            tokenR : 'true'
    });
    }catch(error) {
        res.status(422).send({
            tokenR : 'false'
    });
    }
} 
const logout = async (req, res) => {
    try {

        return res.status(200).json({ msg: 'Logout bem-sucedido' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
}

module.exports = { register, login, refresh, logout , upload};