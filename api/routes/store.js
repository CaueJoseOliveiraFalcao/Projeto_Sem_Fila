const express = require("express");
const { createNewClient , showClients } = require("../controllers/store.js");
const isAuthenticated  = require('../controllers/authenticated.js')

const storeRouter = express.Router();

storeRouter.post('/create' ,isAuthenticated , createNewClient);
storeRouter.post('/show' , showClients)
module.exports = storeRouter;