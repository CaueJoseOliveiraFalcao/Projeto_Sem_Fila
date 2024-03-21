const express = require("express");
const { createNewClient , showClients } = require("../controllers/store.js");


const storeRouter = express.Router();

storeRouter.post('/create' , createNewClient);
storeRouter.post('/show' , showClients)
module.exports = storeRouter;