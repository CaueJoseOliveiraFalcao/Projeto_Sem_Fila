import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({path : './.env'})

export const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    port : process.env.DB_PORT,
    password : process.env.DB_PASSWORD,
    database : process.env.DB,
})

