const express = require('express');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');
const videoRoute = require('./routes/video');
const app = express();


app.use('/user', userRoute.route);
app.use('/image', imageRoute.route);
app.use('/video', videoRoute.route);


app.listen(5555);