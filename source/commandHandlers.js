const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");
const formatLog = require("./utils/formatLog");
const formatters = require("./utils/formatters")


const baseDir = path.resolve("./data");

const commandHanlders = {};

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

commandHanlders.deleteCategory = () => {};

commandHanlders.listCategoryNotes = () => {};

commandHanlders.createNote = () => {};

commandHanlders.showNote = () => {};

commandHanlders.deleteNote = () => {};

module.exports = commandHanlders;
