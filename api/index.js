const  express  = require('express');
const  cors  = require('cors');
const authRouter = require('./routes/auth.js')
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api/auth' , authRouter);

app.listen(8082 , () =>{
    console.log('porta 8082');
})