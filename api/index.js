const  express  = require('express');
const  cors  = require('cors');
const authRouter = require('./routes/auth.js');
const storeRouter = require('./routes/store.js');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api/auth' , authRouter);
app.use('/api/store' , storeRouter);
app.listen(8082 , () =>{
    console.log('porta 8082');
})