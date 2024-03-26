const express = require("express");
const { createNewClient , showClients , deleteClient } = require("../controllers/store.js");
const isAuthenticated  = require('../controllers/authenticated.js')

const storeRouter = express.Router();

storeRouter.post('/create' , isAuthenticated , createNewClient);
storeRouter.post('/show' ,isAuthenticated, showClients);
storeRouter.post('/delete' ,isAuthenticated,deleteClient);
module.exports = storeRouter;