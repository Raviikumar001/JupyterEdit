const mongoose = require('mongoose');

const connectDb = (url)=> {
    console.log(url)
    return mongoose.connect(url, {
        dbName:"Jupyter-Edit"
    })
}

module.exports={
    connectDb
}