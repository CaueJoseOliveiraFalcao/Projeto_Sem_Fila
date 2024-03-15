import express from "express";
import { login, logout, refresh, register } from "../controllers/auth.js";



const authRouter = express.Router();

authRouter.post('/register' , register);
authRouter.post('/login' , login);
authRouter.get('/refresh' , refresh);
authRouter.post('/logout' , logout);


export default authRouter;