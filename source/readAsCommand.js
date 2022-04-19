//all the inout dealing with commands will be handled here

const _event = require("events");
const e = new _event();
const commandHanlders = require("./commandHandlers");
const noteHandlers = require("./handleNoteCommands");
let currentProcess = "command"
const processCommandInput = {};
let currentNote = ""

//List of all commands that is going to be used
processCommandInput.commands = {
  //category commands
  "cat create": "cat create name",
  "cat list": "cat list",
  "cat delete": "cat delete name",
  "cat notes": "cat notes name",
  //note related
  "note create": "note create --category --title",
  "note show": "note show category id",
  "note delete": "note delete category id",
  //other
  "clear" : "clears the console"
};

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
  }
});

e.on("note-show", function (data) {
  commandHanlders.showNote(data);
});

e.on("note-delete", function (data) {
  commandHanlders.deleteNote(data);
});

e.on("clear", function(){
  commandHanlders.clear()
})

//handling note opening and editing
e.on("enter-write-note", function(data){
currentProcess = "note"
const d = data.split("--")
const title = d[2].trim()
noteHandlers.enter(title)
})

e.on("exit-write-note", function(data){
noteHandlers.exit(data)
currentProcess = "command"
})

e.on("handle-write-note", function(){
console.log(currentNote)
})

//invalid commands
e.on("invalid", function () {
  console.log("Invalid Command");
});

/******************************************************* ****************************************/

processCommandInput.readAsCommand = (data) => {
  const command = data.split(" ");
  if(currentProcess==="note"){
    if(data.trim()===":wq" || data.trim()===":q"){
      e.emit("exit-write-note", data.trim())
    } else {
      e.emit("handle-write-note", data)
    }
  } else {

  if(command[0] === "clear"){
    e.emit("clear")
  } else if (`${command[0]} ${command[1]}` in processCommandInput.commands) {
    e.emit(command[0] + "-" + command[1], data);
  } else {
    e.emit("invalid");
  }
  }
};

module.exports = processCommandInput;
