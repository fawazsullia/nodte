const formatLog = require("./formatLog");
const schemaHandler = require("./handleSchema");
const fs = require("fs")

async function writeFilePromise(requiredDir,id, commandArr) {
    fs.writeFile(`${requiredDir}/${id}.txt`,"",function(err){
        if (err){
          formatLog("Could not create the note", "alert")
        }else {
          const res= schemaHandler.parse()
          const newArr = res
          newArr[commandArr[1].trim()][id] = commandArr[2]
          schemaHandler.write(newArr)
          formatLog("Note created successfully", "success")
        }
      }); 
}

module.exports = writeFilePromise