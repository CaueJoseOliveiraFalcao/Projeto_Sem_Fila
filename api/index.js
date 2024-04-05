const  express  = require('express');
const  cors  = require('cors');
const authRouter = require('./routes/auth.js');
const storeRouter = require('./routes/store.js');
const imgRouter = require('./routes/img.js');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(express.static(path.join(__dirname, 'controllers' , 'public')));
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api/auth' , authRouter);
app.use('/api/store' , storeRouter);
app.use('/api/img' , imgRouter);

const APLICATION_PORT = 8082
const APLICATION_WAY = `http://localhost:${APLICATION_PORT}/`
app.listen(APLICATION_PORT);

module.exports = {APLICATION_WAY};