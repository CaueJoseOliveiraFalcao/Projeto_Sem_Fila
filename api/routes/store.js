const express = require("express");
const { createNewClient , showClients , deleteClient , changeStatus , showAllStores , showStoreDataAndUsersStoreData , changeInfo} = require("../controllers/store.js");
const isAuthenticated  = require('../controllers/authenticated.js')

const storeRouter = express.Router();

storeRouter.post('/create' , isAuthenticated , createNewClient);
storeRouter.post('/show', showClients);
storeRouter.post('/delete' ,isAuthenticated,deleteClient);
storeRouter.post('/change' , isAuthenticated , changeStatus);
storeRouter.post('/changeInfo' , isAuthenticated , changeInfo);
storeRouter.post('/showStoresUsers' , showStoreDataAndUsersStoreData);
storeRouter.get('/showStores' , showAllStores);

module.exports = storeRouter;