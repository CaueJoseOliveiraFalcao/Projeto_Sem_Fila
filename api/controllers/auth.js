const { query } = require("express");
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const  register = async (req,res) =>{
    
    if (!req.body){
        return res.status(422).json({msg: 'Entrada Vazia'})
    }
    const {name , cnpj , password , imgProfile , store_desc} = req.body
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
        return res.status(200).json({msg : 'cadastro efetudado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : error});
    } 
    }
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

        res.status(200).send({
            accessToken : token,
            id : user.id,
            cnpj : user.cnpj,
            name : user.name,
            imgProfile : user.imgProfile,
            store_desc : user.store_desc,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({msg : error});
    }
} 
 const  refresh = (req,res) =>{

} 
 const  logout = (req,res) =>{

} 

module.exports = { register, login, refresh, logout };