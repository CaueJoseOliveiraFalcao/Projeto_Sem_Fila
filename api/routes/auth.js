const express = require("express");
const { login, logout, refresh, register , upload} = require("../controllers/auth.js");
const isAuthenticated  = require('../controllers/authenticated.js');

const authRouter = express.Router();

authRouter.post('/register' , register);
authRouter.post('/login' , login);
authRouter.post('/upload' , isAuthenticated ,upload);
authRouter.get('/refresh' , refresh);
authRouter.get('/logout' , logout);


module.exports = authRouter;