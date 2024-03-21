const express = require("express");
const { createNewClient } = require("../controllers/store.js");


const storeRouter = express.Router();

storeRouter.post('/create' , createNewClient);

module.exports = storeRouter;