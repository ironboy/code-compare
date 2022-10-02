const port = 3000;
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.listen(port, () => console.log('Running on port ' + port));