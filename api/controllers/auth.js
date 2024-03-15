import { db } from "../connectdb.js"

export const  register = async (req,res) =>{
    const {userName , email , password} = req.body

    if (!userName){
        return res.status(422).json({msg: 'nome obrigatorio'})
    }
    if (!email){
        return res.status(422).json({msg: 'email obrigatorio'})
    }
    if (!password){
        return res.status(422).json({msg : 'senha obrigatorio'})
    }
    

} 
export const  login = (req,res) =>{

} 
export const  refresh = (req,res) =>{

} 
export const  logout = (req,res) =>{

} 