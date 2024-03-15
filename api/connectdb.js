import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({path : './.env'})

 const DbConfig = {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    port : process.env.DB_PORT,
    password : process.env.DB_PWD,
    database : process.env.DB_NAME,
};

const  db = mysql.createConnection(DbConfig);

export {db};