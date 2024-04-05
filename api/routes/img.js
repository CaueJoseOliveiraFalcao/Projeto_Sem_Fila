const express = require("express");
const {searchImg , upload} = require("../controllers/ImgController.js");
const isAuthenticated  = require('../controllers/authenticated.js')

const imgRouter = express.Router();

imgRouter.post('/seachProfile' , isAuthenticated , searchImg);
imgRouter.post('/uploadProfile' , isAuthenticated , upload );
module.exports = imgRouter;