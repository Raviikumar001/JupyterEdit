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

    res.status(200).json({document:newDocument, message:"Document created Successfully"})

 } catch (error) {
    console.error('Error creating Document:', error);
        res.status(500).json({ error: "Internal Server Error, Couldn't Create Document" });

 }

    

}


const getDocuments =async (req,res, next)=> {

    try {

        // console.log(req.query.id)
        const documents = await Document.find({creator:req.query.id})
        
        return res.status(200).json({documents, message:"Documents fetched successfully"});

        
    } catch (error) {
        console.error('Error creating Document:', error);
        res.status(500).json({ error: "Internal Server Error, Couldn't fetch Documents" });
    }



}

const getDocumentById = async (req,res,next)=> {
    console.log('hello', req.query.id);

    try {
        const doc = await Document.findOne({documentId:req.query.id});
        // console.log(recepie, "Recepie fetched");
        res.status(200).json({doc, message:"Document fetched successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to fetch Document."})
    }
}

const updateDocumentTitle = async (req,res,next)=> {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const updateRecepie = await Document.findOneAndUpdate({documentId:id}, {name:title},{new: true})
        console.log(updateRecepie)
        res.status(200).json({updateRecepie ,message:"Document Title updated succefully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to Update Title."})
    }
}

const deleteDocuments = async(req,res,next)=>
{   

    try {
        const id = req.query.id;
        const result = await Document.deleteOne({ _id: id });
        console.log(result);
      
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Document not found" });
        }
        
        res.status(200).json({ message: "Successfully removed Document" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to Delete Document."})
    }
}


module.exports ={
    createDocument,
    getDocuments,
    deleteDocuments,
    getDocumentById,
    updateDocumentTitle

}