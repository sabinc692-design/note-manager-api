const express=require("express");
const { getAllNotes,createNotes,deleteSpecificnote} = require("../controller/note.controller");
const noteroute= express.Router();

//feature
noteroute.get("/",getAllNotes)
noteroute.post("/",createNotes)
// noteroute.put("/",)
 noteroute.delete("/:id",deleteSpecificnote)
// noteroute.get("/:id",)

module.exports=noteroute