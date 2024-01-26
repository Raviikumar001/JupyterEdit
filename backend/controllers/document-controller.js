const User = require('../models/user');
const Document = require('../models/document');
const { v4: uuidv4 } = require('uuid');


const createDocument =async(req,res,next)=> {

 try {
    
    const userid = req.query.id;

    const newDocument = new Document({
        creator:userid,
        documentId:uuidv4(),



    })

    await newDocument.save();
    console.log('document created Successfully');

    res.status(200).json({newDocument, message:"Document created Successfully"})

 } catch (error) {
    console.error('Error creating Document:', error);
        res.status(500).json({ error: "Internal Server Error, Couldn't Create Document" });

 }

    

}



module.expore ={
    createDocument
}