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

app.get('/', function(req, res) {
    var id = req.param('id');

    var jsonObj = {
        "Method": req.method,
        "Path": req.path,
        "Port": req.get('host').split(':')[1],
        "Headers": req.headers
    }
    console.log("\n");
    console.log(jsonObj);
    res.send(jsonObj);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})