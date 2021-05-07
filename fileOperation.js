//using readline module to read lines from terminal/cmd 
const readline = require("readline");
//import fs module to read and write from files
const fs = require("fs");

//declare a array to store filenames
var fileName = []

//main 
function main() {
    var data = fs.readFileSync('fileNameList.txt');
    var fnData = data.toString();
    if (fnData !== "") {
        fnData = fnData.split("\n");
        fnData = fnData.map(filename => {
            fileName.push(filename);
        })
        userInput();
    } else {
        userInput();
    }

}

function userInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter filename: ", (filename) => {
        if (fileName.includes(filename)) {

            console.log("File already exists!");
            rl.close();
            return userInput();
        } else {
            fileName.push(filename);
            convertFileNameArrToString(fileName)
            createFile(filename);
            rl.close();
        }
    });
}
//this function takes list of filenames
function convertFileNameArrToString(fnArray) {
    //converts the array into string
    var fnStr = "";
    for (let i = 0; i < fnArray.length; i++) {
        fnStr = fnStr + fnArray[i] + '\n';
    }
    //write the string to the filenames.txt file
    fs.writeFile("./fileNameList.txt", fnStr, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
//this function takes a filename as an argument and creates a new file with content "You are awesome"
function createFile(filename) {
    fs.writeFile(filename + '.txt', 'You are awesome', (err) => {
        if (err) { return console.log(err); }
    });
}

main();
