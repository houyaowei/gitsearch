#! /usr/bin/env node

var exec = require("execa");
var fs = require("fs");

var searchPattern = process.argv.slice(2);
console.log("searchPattern:" + searchPattern);

if (!fs.existsSync(searchPattern.toString())) {
    console.log("File or Directory is not found");

} else {
    var fileORDirectory = fs.lstatSync(searchPattern.toString());
    var isFile = fileORDirectory.isFile();
    var isDir = fileORDirectory.isDirectory();
    if (isFile) {
        //is windows
        var isWin = /^win/.test(process.platform)
        if (isWin) {
            exec.shell('dir ' + searchPattern).then(result => {
                console.log(result.stdout);
            });
        }
        exec.shell('ls -a | grep ' + searchPattern).then(result => {
            console.log(result.stdout);
        });
    }
    if (isDir) {
        exec.shell('cd ' + searchPattern + "&& ls -a").then(result => {
            console.log(result.stdout);
        });
    }
}