const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");

const baseDir = path.resolve("./data");

const commandHanlders = {};

//create a category
commandHanlders.createcategory = (data) => {
  const titleArr = data.split(" ");
  if (!titleArr[2]) {
    console.log("Category needs a name");
  }
  let dir = path.join(baseDir, titleArr[2]);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, true);
    let res = schemaHandler.parse()
    let newArr = { ...res, [titleArr[2]] : {}  }
    schemaHandler.write(newArr)
    console.log("category created");
  } else {
    console.log("Already exists");
  }
};

//list category
commandHanlders.listCategory = () => {};

commandHanlders.deleteCategory = () => {};

commandHanlders.listCategoryNotes = () => {};

commandHanlders.createNote = () => {};

commandHanlders.showNote = () => {};

commandHanlders.deleteNote = () => {};

module.exports = commandHanlders;
