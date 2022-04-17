const formatLog = require("./formatLog")

const formatters = {}

formatters.vertSpace = (space)=>{
    for(let i =0; i<space; i++){
        console.log("\n")
    }
    
}

formatters.line = ()=>{
let str = ""
for(let i =0; i<process.stdout.columns; i++){
str+="+"
}
formatLog(str,"line")
}

formatters.mid = (str)=>{
    //divide str/2, width/2
    //space will be width/2-str/2
    let out = ""
    const space = process.stdout.columns/2 - str.length/2
    for(let i = 0; i<space; i++){
    out+=" "
    }
    out+=str
    formatLog(out, "heading")
    }

formatters.heading = (str)=>{
formatters.line()
formatters.mid(str)
formatters.line()


}






module.exports = formatters