var express = require('express')

var app = express();

app.use(function(req, res, next) {
    req.rawBody = "";
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function() {
        next();
    });
});

app.get('*', function(req, res) {
    var id = req.param('id');

    var myHeader, headerArray, key;
    myHeader = JSON.parse(JSON.stringify(req.headers));
    headerArray = [];
    for (key in myHeader) {
        headerArray.push(key);         // Push the key on the array
        headerArray.push(myHeader[key]); // Push the key's value on the array
    }

    var jsonObj = {
        "method": req.method,
        "path": req.path,
        "host": req.host,
        "port": req.get('host').split(':')[1],
        "header": headerArray
    }
    console.log("\n");
    console.log(jsonObj);
    res.send(jsonObj);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})