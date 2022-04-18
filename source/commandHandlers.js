const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");
const formatLog = require("./utils/formatLog");
const formatters = require("./utils/formatters")
const crypto = require("crypto");


const baseDir = path.resolve("./data");

const commandHanlders = {};

//clear the console
commandHanlders.clear= ()=>{
  console.clear()
}

//create a category
commandHanlders.createcategory = (data) => {
  const titleArr = data.split(" ");
  if (!titleArr[2]) {
    formatLog("category needs a name", "alert")
  } else {
    let dir = path.join(baseDir, titleArr[2]);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, true);
      let res = schemaHandler.parse()
      let newArr = { ...res, [titleArr[2]] : {}  }
      schemaHandler.write(newArr)
      formatLog("category created, name: "+titleArr[2], "success")
    } else {
      formatLog("category with the name " + titleArr[2]+" already exists", "alert")
    }
  }

};

//list all categories
commandHanlders.listCategory = (data) => {
  let res = schemaHandler.parse()
  formatters.vertSpace(1)

 formatters.heading("LIST OF CATEGORIES")
 formatters.vertSpace(1)

  for(let key in res){
    formatLog(key,"list")

  }
  formatters.vertSpace(1)

  formatters.line()


};

//delete category
commandHanlders.deleteCategory = (data) => {
  const commandArr = data.split(" ");
  let requiredDir = baseDir+"/"+commandArr[2]
  if (fs.existsSync(requiredDir)) {
    fs.rm(requiredDir, { recursive: true }, (err) => {
      if (!err) {
        let res = schemaHandler.parse()
        let newArr = res
        delete newArr[commandArr[2]]
        console.log(newArr)
        schemaHandler.write(newArr)
        formatLog("category "+commandArr[2]+" deleted", "success")
      }
      else {
        formatLog("could not delete the category","alert")
      }
  
       });
} else {
    formatLog("category not found", "alert")
}

};

commandHanlders.listCategoryNotes = () => {};


//create a note
commandHanlders.createNote = (data) => {
const commandArr = data.split("--")
if(commandArr.length < 3){
  formatLog("a category name and title is required", "alert")
} else {
  const requiredDir = baseDir+"/"+ commandArr[1].trim()

if(!fs.existsSync(requiredDir)){
  formatLog("category "+ commandArr[1]+"does not exist")
}else {
  //create a file here
  const id = crypto.randomBytes(14).toString("hex");
  fs.writeFile(`${requiredDir}/${id}.txt`,"",function(err){
    if (err){
      formatLog("Could not create the note", "alert")
    }else {
    formatLog("Note created successfully", "success")
    // I need to edit the schema file here
    //alternatively, when note handler is ready, you can trigger open
    }
  }); 

}
}

};

commandHanlders.showNote = () => {};

commandHanlders.deleteNote = () => {};

module.exports = commandHanlders;
