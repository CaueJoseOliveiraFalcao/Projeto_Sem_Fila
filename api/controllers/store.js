const jwt = require('jsonwebtoken')
const db = require("../models/index.js");

const showAllStores = async(req,res) => {
    try{
        const stores = await db.Store.findAll();

        return res.status(200).json({stores});
    }catch(error){
        return res.status(422).json({msg : error})
    }
}
const showStoreDataAndUsersStoreData = async(req, res) => {
    const {id} = req.body
    if(!id){
        return res.status(422).json({msg : 'Sem informações primarias da loja'});
    }
    try {
        const store = await db.Store.findOne({
            where : {id}
        })

        if(!store){
            return res.status(422).json({msg : 'Loja nao existe'});
        }
        const users = await store.getUsers()
        return res.status(200).json({data : {
            storeif : {
                id : store.id,
                cnpj : store.cnpj,
                name : store.name,
                imgProfile : store.imgProfile,
                storeDesc : store.store_desc,
                created : store.createdAt,
                updated : store.updatedAt
            },
            users : users
        }});
    }
    catch(error){
        return res.status(422).json({msg : error});
    }
}
const createNewClient =  async (req,res) => {
    const {storeid , clientname , clientpassword} = req.body
    if (!clientpassword || !storeid){
        return res.status(422).json({msg : 'Necessario Senha'});
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
        return res.status(500).json({msg : 'erro a criaçao de senha'});
    }

}
const showClients = async (req,res) => {
    const {storeid } = req.body
    if (!storeid){
        return res.status(422).json({msg : 'Informe todos os dados'});
    }

    try{
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
const deleteClient = async (req,res) => {
    const {id} = req.body
    try{
        const user = await db.User.findByPk(id);

        if (!user){
            return res.status(422).json({msg: 'usuario nao encontrado'});
        }
        await user.destroy();
        return res.status(200).json({msg: 'usuario deletado'})
    }catch(err){
        return res.status(500).json({msg: 'erro na insersao'});
    }

}
const changeStatus = async (req,res) => {
    const {id} = req.body
    try{
        const user = await db.User.findByPk(id);

        if (!user){
            return res.status(422).json({msg: 'usuario nao encontrado'});
        }
        if (user.status === 'peding'){
            user.status = 'completed';
        }
        else{
            user.status = 'peding';
        }
        await user.save();
        return res.status(200).json({msg: user.status});
    }catch(error){
        return res.status(500).json({msg: error});
    }
}
const changeInfo = async (req , res) =>{
    const {name , store_desc , } = req.body;
    const token = req.headers.authorization;

    if (!name || !store_desc){
        return res.status(422).json({msg: 'envie todas as informações requiridas'});
    }
    try {
        const decoded = jwt.verify(token , process.env.TOKEN);
        id = decoded.id;
    
        const user = await db.Store.findOne({
            where : {id}
        })
        if (user) {
            user.name = name,
            user.store_desc = store_desc
            await user.save();
            return res.status(200).json({msg: 'Mudanças efetuadas'});
        }
    }catch(err){
        return res.status(500).json({msg: err});
    }

}
module.exports = {createNewClient,showClients, deleteClient , changeStatus , showAllStores ,showStoreDataAndUsersStoreData , changeInfo};