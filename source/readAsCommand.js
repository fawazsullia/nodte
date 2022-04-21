//all the inout dealing with commands will be handled here

const _event = require("events");
const e = new _event();
const commandHanlders = require("./commandHandlers");
const noteHandlers = require("./handleNoteCommands");
let currentProcess = "command"
const processCommandInput = {};
let currentNote = ""
let currentCat = ""

//List of all commands that is going to be used
processCommandInput.commands = {
  //category commands
  "cat create": "cat create <name>; creates a category",
  "cat list": "cat list; list all the categories",
  "cat delete": "cat delete <name>; delete a category",
  "cat notes": "cat notes <name>; list all notes in a category",
  //note related
  "note create": "note create --<category> --<title>; create a new note and add text to it",
  "note show": "note show <category> <id>; show a note",
  "note delete": "note delete <category> <id>; delete a note",
  //other
  "clear" : "clears the console"
};

processCommandInput.exitNoteCommands = {
  ":wq" : "Save and exit the note",
  ":q" : "Exit the note without saving"
}

/******************************************************* ****************************************/

//input handlers
e.on("cat-create", function (data) {
  commandHanlders.createcategory(data);
});

e.on("cat-list", function (data) {
  commandHanlders.listCategory(data);
});

e.on("cat-delete", function (data) {
  commandHanlders.deleteCategory(data);
});

e.on("cat-notes", function (data) {
  commandHanlders.listCategoryNotes(data);
});

e.on("note-create", function (data) {
  const r = commandHanlders.createNote(data);
  if(r.status === true){
    currentNote = r.id
    e.emit("enter-write-note", data)
  }
});


//show and append to note
e.on("note-show", function (data) {
  commandHanlders.showNote(data);
});

// delete note
e.on("note-delete", function (data) {
  commandHanlders.deleteNote(data);
});


//clear terminal
e.on("clear", function(){
  commandHanlders.clear()
})

//handling note opening and editing
e.on("enter-write-note", function(data){
currentProcess = "note"
const d = data.split("--")
const title = d[2].trim()
let c = d[1].trim()
currentCat = c
noteHandlers.enter(title)
})

e.on("exit-write-note", function(data){
noteHandlers.exit(data, currentNote, currentCat)
currentProcess = "command"
})

e.on("handle-write-note", function(data){
noteHandlers.write(data)
})

//man command
e.on("man", function(data){
  commandHanlders.man(data, processCommandInput.commands)
})

//invalid commands
e.on("invalid", function () {
  console.log("Invalid Command");
});

/******************************************************* ****************************************/


//process all the commands to trigger events
processCommandInput.readAsCommand = (data) => {
  const command = data.split(" ");
  if(currentProcess==="note"){
    if(data.trim() in processCommandInput.exitNoteCommands){
      e.emit("exit-write-note", data.trim())
    } else {
      e.emit("handle-write-note", data)
    }
  } else {

  if(command[0].trim()==="man"){
    e.emit("man", data)
  }
  else if(data.trim() === "clear"){
    e.emit("clear")
  } else if (`${command[0]} ${command[1]}` in processCommandInput.commands) {
    e.emit(command[0] + "-" + command[1], data);
  } else {
    e.emit("invalid");
  }
  }
};

module.exports = processCommandInput;
