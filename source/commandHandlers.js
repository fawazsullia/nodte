const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");
const formatLog = require("./utils/formatLog");


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
      formatLog("category created", "success")
    } else {
      formatLog("category with the name already exists", "alert")
    }
  }

};

//list all categories
commandHanlders.listCategory = (data) => {



};

commandHanlders.deleteCategory = () => {};

commandHanlders.listCategoryNotes = () => {};

commandHanlders.createNote = () => {};

commandHanlders.showNote = () => {};

commandHanlders.deleteNote = () => {};

module.exports = commandHanlders;
