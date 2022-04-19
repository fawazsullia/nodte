// handles all activities that involve write notes. 
// mainly deals with writing and appending to files

const formatter = require("./utils/formatters")

//recognised commands
// :wq to save and exit
// :q quit without saving

const handleNoteCommands ={}

handleNoteCommands.exit = (data)=>{
 formatter.heading("NOTE EXITED")   
}

handleNoteCommands.enter = (data)=>{
    formatter.heading("WRITING NOTE "+ data)
}

module.exports = handleNoteCommands

