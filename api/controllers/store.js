const jwt = require('jsonwebtoken')
const db = require("../models/index.js");

const createNewClient =  async (req,res) => {
    const {storeid , clientname , clientpassword , token} = req.body
    const tokenisT = false
    if (!clientname || !clientpassword || !storeid){
        res.status(422).json({msg : 'Informe todos os dados'});
    }
    if(!token){
        res.status(422).json({msg : 'Loja sem Token'});
    }
    
    try{
        const decoded = jwt.verify(token , process.env.TOKEN)
    }catch{
        res.status(422).json({msg : 'Loja Não autorizada'})
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


module.exports = {createNewClient};