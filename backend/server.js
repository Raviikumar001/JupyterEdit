
const express = require('express');
const cors = require('cors');
const {connectDb} = require('./db/connect')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes')

require('dotenv').config();

//auth files



const app = express();
const port= process.env.PORT|| 5000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"*",
    method:"GET,PATCH,POST,DELETE"
}));

app.use('/v1/auth', authRoutes);


app.get('/v1', (req,res)=> {
console.log('hello Lets edit;');
res.send('lets edit');
})


const start =async (req,rest)=> {
    try {
        await connectDb(process.env.MONGODB_STRING);
        app.listen(port,()=> {
        console.log(`Server is running on port ${port}`);
        })
    } catch (error) {   
        console.log(error);
    }
}

start();

