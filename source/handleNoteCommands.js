// handles all activities that involve write notes. 
// mainly deals with writing and appending to files

const fs = require("fs")
const path = require("path")
const formatter = require("./utils/formatters")
let noteStr = ""
const pathToData = path.join(__dirname,"./../data")

//recognised commands
// :wq to save and exit
// :q quit without saving

const handleNoteCommands ={}

handleNoteCommands.exit = (data, currentNote, currentCat)=>{
    //check what the command is, :wq or :q
    if(data.trim()===":wq"){
        currentNote = currentNote.trim()
        fs.appendFileSync(pathToData+"/"+currentCat+"/"+currentNote+".txt", noteStr)
        formatter.heading("NOTE SAVED AND EXITED")   
    }else if(data.trim()===":q"){
        formatter.heading("NOTE EXITED")   
    }
}

//enter note edit mode
handleNoteCommands.enter = (data)=>{
    formatter.heading("WRITING NOTE "+ data)
}

//write notes
handleNoteCommands.write = (data)=>{
noteStr = noteStr + data.trim() + "\n"
}

module.exports = handleNoteCommands

