const express = require('express');
const PostRout = require('./controller/PostContoller').PostRout;
const UserRout = require('./controller/UserController').UserRout;
const app  = express();
const port = 3000;

app.use('/',PostRout);
app.use('/',UserRout);
app.listen(port, () => console.log(`This app listening at http://localhost:${port}`))
