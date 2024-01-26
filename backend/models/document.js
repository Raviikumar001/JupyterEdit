const mongoose = require('mongoose');
const User = require('./user');


const DocumentSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: User, 
      },
      documentId:{
        type:String,
        required:true,
      },

    name:{
        type:String,
        default:"Untitled Document"
    },

    data:Object

})

const Document = mongoose.model('document',DocumentSchema)


module.exports = Document