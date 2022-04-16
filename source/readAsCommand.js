//all the inout dealing with commands will be handled here

const _event = require("events");
const e = new _event();
const commandHanlders = require("./commandHandlers");

const processCommandInput = {};

//List of all commands that is going to be used
processCommandInput.commands = {
  //category commands
  "cat create": "cat create name",
  "cat list": "cat list name",
  "cat delete": "cat delete name",
  "cat notes": "cat notes name",
  //note related
  "note create": "note create --title",
  "note show": "note show id",
  "note delete": "note delete id",
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
  commandHanlders.createNote(data);
});

e.on("note-show", function (data) {
  commandHanlders.showNote(data);
});

e.on("note-delete", function (data) {
  commandHanlders.deleteNote(data);
});

e.on("invalid", function () {
  console.log("Invalid Command");
});

/******************************************************* ****************************************/

processCommandInput.readAsCommand = (data) => {
  const command = data.split(" ");
  if (`${command[0]} ${command[1]}` in processCommandInput.commands) {
    e.emit(command[0] + "-" + command[1], data);
  } else {
    e.emit("invalid");
  }
};

module.exports = processCommandInput;
