//this file will have any operations related to schema.txt
const fs = require("fs")
const path = require("path")

const pathToSchema = path.join(__dirname, "./../schema.txt")

const schemaHandler = {}

schemaHandler.parse = ()=>{
const res = fs.readFileSync(pathToSchema)
return JSON.parse(res)}

schemaHandler.write = (obj)=> {
fs.writeFileSync(pathToSchema, JSON.stringify(obj))
}



module.exports = schemaHandler