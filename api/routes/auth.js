const express = require("express");
const { login, logout, refresh, register} = require("../controllers/auth.js");
const isAuthenticated  = require('../controllers/authenticated.js');

const authRouter = express.Router();

authRouter.post('/register' , register);
authRouter.post('/login' , login);

authRouter.get('/refresh' , refresh);
authRouter.get('/logout' , logout);


module.exports = authRouter;