const jwt = require('jsonwebtoken')
const db = require("../models/index.js");

const createNewClient =  async (req,res) => {
    const {storeid , clientname , clientpassword , token} = req.body
    const tokenisT = false
    if (!clientname || !clientpassword || !storeid){
        return res.status(422).json({msg : 'Informe todos os dados'});
    }
    if(!token){
        return res.status(422).json({msg : 'Loja sem Token'});
    }
    try{
        const existOtherPassword = await db.User.findOne({
            where : {clientpassword}
        })
        if(existOtherPassword){
            return res.status(422).json({msg : 'senha existente'});
        }
        const id = storeid;
        const existStore = await db.Store.findOne({
            where : {id}
        })
        if(!existStore){
            return res.status(422).json({msg : 'Loja nao existe'});
        }
        const status = 'peding';

        await db.User.create({
            clientname,
            clientpassword,
            storeid,
            status 
        });
        return res.status(200).json({msg : 'cadastro efetudado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : error});
    }

}
const showClients = async (req,res) => {
    const {storeid , token} = req.body
    if (!storeid){
        return res.status(422).json({msg : 'Informe todos os dados'});
    }
    if(!token){
        return res.status(422).json({msg : 'Loja sem Token'});
    }

    try{
        const decoded = await jwt.verify(token , process.env.TOKEN)
        const id = storeid
        const store = await db.Store.findOne({
            where : {id}
        })
        const users = await store.getUsers();
        return res.status(200).json({users})
    }catch{
        return res.status(422).json({msg : 'Loja Não autorizada'})
    }
}

module.exports = {createNewClient,showClients};