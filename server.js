var express = require('express');
var app = express();

app.use(express.static('.'));

app.listen(5000, function () {
  console.log('Example app listening on port !');
});
