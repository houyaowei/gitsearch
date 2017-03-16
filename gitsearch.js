#!/usr/bin/env node

var commander = require("commander");
var request = require("request");
var Table = require('cli-table');

commander
    .version('0.0.1')
    .usage('<keywords>')
    .parse(process.argv);

if (!commander.args.length) {
    commander.help();
} else {
    console.log('Keywords: ' + commander.args);
    var keywords = commander.args;
    var url = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=' + keywords;

    //send request
    request({
        method: 'GET',
        headers: {
            'User-Agent': 'houyaowei'
        },
        url: url
    }, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log("the number of found repositories is :", body.total_count);
            var table = new Table({
                head: ['name', 'http url'],
                colWidths: [100, 200]
            });
            var result = [];
            body.items.forEach(function(ele, index) {
                table.push([ele.name, ele.html_url]);
            });
            console.log(table.toString());
        } else if (error) {
            console.log('Error: ' + error);
        }
    });
}