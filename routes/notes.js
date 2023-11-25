const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


//this is new for me
const router = express.Router();



router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);  
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("internal server error");
    }
   
});

router.get('/fetchnotes/::id', fetchuser, async (req, res) => {
    // Your code here
    try {
        let notes = await Notes.findById(req.params.id);
        res.json(notes);  
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("internal server error");
    }
   
});


//adding new notes 

router.post('/addnotes',[
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "description must be mini of").isLength({ min: 1 }),

],fetchuser,async(req,res)=>{
    try {
        const result = validationResult(req);
        const{title,description,tag} = req.body;

        if (!result.isEmpty()) {
          return res.send({ errors: result.array() });
        }
       try {
        const note = new Notes({
            title,description,tag,user:req.user.id
          });
  
          const saveNote = await note.save();
          res.json(saveNote);
        
       } catch (error) {
        console.error(error.mesage);

       }
     

    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("internal server error");
    }
   
});


// updating existing note login requires 
router.put('/updatenote/:id' , fetchuser ,async(req,res) =>{
    const {title ,description,tag} = req.body;

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    

    //finding note that user want to update 
    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(500).send("not exixting");
    }
    
    if(note.user.toString() !== req.user.id){
        res.status(401).send("bad request");

    }

    //if above any this is not happen then note is present and it is edditing by real user 

    note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new:true})
    res.json({note});
})










router.delete('/deletenote/:id' , fetchuser ,async(req,res) =>{

  
    

    //finding note that user want to update 
    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("not exixting");
    }
    
    if(note.user.toString() !== req.user.id){
        res.status(401).send("bad request");

    }

    //if above any this is not happen then note is present and it is edditing by real user 

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success" : "note has been deleted" , note:note});

})



module.exports =  router;