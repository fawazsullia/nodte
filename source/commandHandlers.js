const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");
const formatLog = require("./utils/formatLog");
const formatters = require("./utils/formatters")


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
commandHanlders.createNote = () => {};

commandHanlders.showNote = () => {};

commandHanlders.deleteNote = () => {};

module.exports = commandHanlders;
