// Use this file to generate users.json, which we use to seed the DB in
// seedDB

// Just push 500 user emails onto a JSON object and write it to the file 
var i;
var jsonArr = [];
for (i = 0; i < 501; i++) {
  jsonArr.push({
    email: 'example' + i + '@example.com',
    password: 'password' + i
  });
}

console.log(jsonArr);

var json = JSON.stringify(jsonArr);
var fs = require('fs');

fs.writeFile('./users.json', json, 'utf8');
