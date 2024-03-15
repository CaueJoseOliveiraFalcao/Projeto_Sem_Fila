import { query } from "express"
import { db } from "../connectdb.js"
import  bcrypt  from 'bcrypt'
export const  register = async (req,res) =>{
    
    if (!req.body){
        return res.status(422).json({msg: 'Entrada Vazia'})
    }
    else{
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
        
        db.query('SELECT cnpj FROM stores WHERE cnpj = ?' , [cnpj] , async(error , data) => {
            if (error) { 
                console.log(error)
                return res.status(500).json({msg : error});
            }
            if (data.length > 0){
                console.log('cnpj existente');
                return res.status(500).json({msg : 'cnpj existente'});
            }
            else{
                const passwordHashed = await bcrypt.hash(password , 10);
                db.query('INSERT INTO stores SET ?' , {name , cnpj , password:passwordHashed , imgProfile , store_desc} , (error) => {
                    if (error){
                        console.log(error)
                        return res.status(500).json({msg : error});
                    }
                    else{
                        console.log('cadastro efetuado')
                        return res.status(200).json({msg : 'cadastro efetudado'});
                    }
                })
            }

        })
        
    }


} 
export const  login = (req,res) =>{

} 
export const  refresh = (req,res) =>{

} 
export const  logout = (req,res) =>{

} 