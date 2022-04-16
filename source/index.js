const readLine = require("readline");
const process = require("process")
const {readAsCommand} = require("./readAsCommand")
const readAsNote = require("./readAsNote")

//variable to track the process type
let currentProcess = "command"

//interface to read line
const _interface = readLine.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : ">"
})

// const schemaHandler = require("./utils/handleSchema");
// schemaHandler.write({first : {}})

// process the input
_interface.prompt()
_interface.on("line", (data)=>{

//check the currentProcess
if(currentProcess === "command"){
    readAsCommand(data)
}
if(currentProcess === "note"){
    readAsNote(data)
}

})