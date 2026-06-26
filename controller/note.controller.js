const { error } = require("console");
const { response } = require("express");
const fs=require("fs");
const path= require("path");
const NOTE_DIR = path.join(__dirname, "../notes")


 const getAllNotes =(req,res)=>{
    //api/notes?search =diet
    const {search}=req.query
    fs.readdir(NOTE_DIR,(err,files)=>{
        if(err) return res.status(500).json({error:"failed to read note directory"})
        let notes =files.filter(file=>file.endsWith('.txt'));
    if(search){
        notes=notes.filter(note=>note.includes(search))
    }
    res.json({
        sucess:true,
        data:notes,
        total:notes.length
    })
   
        })

}

// POst create note

const createNotes=(req,res) => {
const{fileName,content}=req.body
if(!fileName || !fileName.trim()){
    return res.status(400).json({
        message:"File name is required"
    })
}

if(!content || !content.trim()){
    return res.status(400).json({
        message:"content is required"
    })
}

//step 3 valadation of only text

if(!fileName.endsWith(".txt")){
    return res.status(400).json({
        message:"file name must end with .txt"
    })
}

//Defining  file path
const filepath=path.join(NOTE_DIR,fileName);

//File should be created by server

fs.writeFile(filepath,content.trim(),"utf-8",(err)=>{
    // if(err){
    //     return res.status(500).json({
    //         message:"server error! could not save the file "
    //     })
    // }
    if (err) {
    console.log(err);

    return res.status(500).json({
        message: err.message
    });
}
    //json data as responese

    res.status(201).json({
        success:true,
        message:`Notes created sucessfully${fileName}`,
        
    })
})












}


//deleting specif notes
const deleteSpecificnote=(req,res)=>{
    const fileName=path.basename(req.params.id)
    console.log("req",fileName)
    console.log("data of file",req.params.fileName)
    const filePath=path.join(NOTE_DIR,fileName);
    fs.unlink(filePath,(err)=>{
        if (err) {
    console.log(err);

    return res.status(500).json({
        message: err.message
    });
    res.status(200).json({
        message: "File deleted successfully"
    });
}
    })
}

module.exports={
    getAllNotes ,
    createNotes,
    deleteSpecificnote,
}