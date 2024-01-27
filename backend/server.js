const express = require('express');
const cors = require('cors');
const { connectDb } = require('./db/connect');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');
const http = require('http'); // Import the http module
const authRoutes = require('./routes/auth-routes');
const documentRoutes = require('./routes/document-routes');
require('dotenv').config();
const mongoose = require('mongoose');
const Document = require('./models/document');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE"
}));

app.use('/v1/auth', authRoutes);
app.use('/v1/api', documentRoutes);

app.get('/v1', (req, res) => {
    console.log('Hello Let\'s edit');
    res.send('Let\'s edit');
});

const server = http.createServer(app); // Create HTTP server


const io = new Server(server, {
    cors:{
        origin: "*",
        methods: "GET,POST"
    }
});

io.on("connection",(socket)=> {

    socket.on("get-document", async documentId => {
        console.log(documentId, "id here")
        const doc = await findDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document",doc.data);

        socket.on("send-changes", delta=> {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
         })

         socket.on("save-document", async data => {
            console.log(data);
            await Document.findByIdAndUpdate(documentId, { data })
          })

    })

    
});
// const recepie = await Recepie.findOne({recepieId:req.query.id});
async function findDocument(id)
{
    if(id==null)
    return;

    const document = await Document.findById(id)
    console.log(document)
    if(document) return document;

}

const start = async () => {
    try {
        await connectDb(process.env.MONGODB_STRING);
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();