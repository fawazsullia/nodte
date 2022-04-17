//handle logging and formatting logs here, instead of
//directly using console log

function formatLog(str, type){
    if(type === "alert"){
        console.log('\x1b[31m%s\x1b[0m', str);
    } else if(type==="success"){
        console.log('\x1b[32m%s\x1b[0m', str);
    }
}

module.exports = formatLog