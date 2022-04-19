const readLine = require("readline");
const process = require("process")
const {readAsCommand} = require("./readAsCommand")

//variable to track the process type

//interface to read line
const _interface = readLine.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : ">"
})

// const schemaHandler = require("./utils/handleSchema");
// schemaHandler.write({first : {}})

// console.log('\x1b[36m%s\x1b[0m', "Hello world");  //cyan

//switch to note editing more


// process the input
_interface.prompt()
_interface.on("line", (data)=>{
    readAsCommand(data)


_interface.prompt()

})

