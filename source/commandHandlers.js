const path = require("path");
const fs = require("fs");
const schemaHandler = require("./utils/handleSchema");
const formatLog = require("./utils/formatLog");
const formatters = require("./utils/formatters");
const crypto = require("crypto");

const baseDir = path.join(__dirname, "./../data");

const commandHanlders = {};

//clear the console
commandHanlders.clear = () => {
  console.clear();
};

//create a category
commandHanlders.createcategory = (data) => {
  const titleArr = data.split(" ");
  if (!titleArr[2]) {
    formatLog("category needs a name", "alert");
  } else {
    let dir = path.join(baseDir, titleArr[2]);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, true);
      let res = schemaHandler.parse();
      let newArr = { ...res, [titleArr[2]]: {} };
      schemaHandler.write(newArr);
      formatLog("category created, name: " + titleArr[2], "success");
    } else {
      formatLog(
        "category with the name " + titleArr[2] + " already exists",
        "alert"
      );
    }
  }
};

//list all categories
commandHanlders.listCategory = (data) => {
  let res = schemaHandler.parse();
  formatters.vertSpace(1);

  formatters.heading("LIST OF CATEGORIES");
  formatters.vertSpace(1);

  for (let key in res) {
    formatLog(key, "list");
  }
  formatters.vertSpace(1);

  formatters.line();
};

//delete category
commandHanlders.deleteCategory = (data) => {
  const commandArr = data.split(" ");
  let requiredDir = baseDir + "/" + commandArr[2];
  if (fs.existsSync(requiredDir)) {
    fs.rm(requiredDir, { recursive: true }, (err) => {
      if (!err) {
        let res = schemaHandler.parse();
        let newArr = res;
        delete newArr[commandArr[2]];
        console.log(newArr);
        schemaHandler.write(newArr);
        formatLog("category " + commandArr[2] + " deleted", "success");
      } else {
        formatLog("could not delete the category", "alert");
      }
    });
  } else {
    formatLog("category not found", "alert");
  }
};

//list all notes in a category
commandHanlders.listCategoryNotes = (data) => {
  const commandArr = data.split(" ");
  const category = commandArr[2].trim();
  let requiredDir = baseDir + "/" + category;
  if (fs.existsSync(requiredDir)) {
    formatters.heading("list of notes in " + category);
    const res = schemaHandler.parse();
    const reqCategory = res[category]; //gives me the object with title
    formatters.vertSpace(1);
    for (let id in reqCategory) {
      console.log(id + " : " + reqCategory[id]);
    }
    formatters.vertSpace(1);
    formatters.line();
  } else {
    formatLog("category with name " + category + " does not exist", "alert");
  }
};

//create a note
commandHanlders.createNote = (data) => {
  const commandArr = data.split("--");
  if (commandArr.length < 3) {
    formatLog("a category name and title is required", "alert");
  } else {
    const requiredDir = baseDir + "/" + commandArr[1].trim();

    if (!fs.existsSync(requiredDir)) {
      formatLog("category " + commandArr[1] + "does not exist", "alert");
    } else {
      //create a file here
      const id = crypto.randomInt(1, 100000).toString();
      fs.writeFileSync(`${requiredDir}/${id}.txt`, "");

      const res = schemaHandler.parse();
      const newArr = res;
      newArr[commandArr[1].trim()][id] = commandArr[2];
      schemaHandler.write(newArr);
      formatLog("Note created successfully", "success");
      return { status: true, id };
    }
  }
};

//show a particular note
commandHanlders.showNote = () => {};

//delete a note
commandHanlders.deleteNote = (data) => {
  const commandArr = data.split(" ");
  const id = commandArr[3];
  const category = commandArr[2];
  if (!category || !id) {
    formatLog("Note id and category required", "alert");
  } else {
    const res = schemaHandler.parse();
    const newObj = res;
    if (category in newObj) {
      if (id in newObj[category]) {
        const title = newObj[category][id];
        const p = path.join(baseDir, category, `${id}.txt`);
        fs.unlinkSync(p);
        delete newObj[category[id]];
        schemaHandler.write(newObj);
        formatLog("Note with title " + title + " deleted", "success");
      } else {
        formatLog("Invalid id", "alert");
      }
    } else {
      formatLog(category + " is not a valid category", "alert");
    }
  }
};

module.exports = commandHanlders;
