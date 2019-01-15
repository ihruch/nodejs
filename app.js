const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('./configs/mongo.config');

const passport = require('passport');
require('./configs/passport.config')(passport);

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const apiRouter = require('./routes/api');
const userCredentialRouter = require('./routes/userCredential')

const app = express();

app.use(passport.initialize());

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/api', apiRouter);
app.use('/api-credential', userCredentialRouter);


module.exports = app;
