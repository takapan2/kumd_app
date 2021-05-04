var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var displayRouter = require('./routes/display');

var app = express();

(async () => {
  try {
    const firebase = require('firebase')
    const CONFIG = require('./public/information/config').config
    firebase.initializeApp(CONFIG)
    const db = firebase.firestore()

    const userRef = db.collection('user').doc('GiPyiR86LfTUqGvilSUt')
    const userDoc = await userRef.get()
    if (userDoc.exists) {
      console.log(userDoc.id)
      console.log(userDoc.data())
      console.log(userDoc.get('name'))
      console.log(userDoc)
    } else {
      console.log('No such document!')
    }
    await db.app.delete()
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`)
  }
})()


// function CAAA(){
// const firebase = require('firebase');
// const config = {
//       apiKey: "AIzaSyA4chVLLT13u2-zlfDlt7p5GXD_98DgY2Q",
//       authDomain: "kumd-app.firebaseapp.com",
//       databaseURL: "https://kumd-app-default-rtdb.firebaseio.com",
//       projectId: "kumd-app",
//       storageBucket: "kumd-app.appspot.com",
//       messagingSenderId: "28972770999",
//       appId: "1:28972770999:web:59ad63f788f272e4868f32",
//       measurementId: "G-YPKJW425F5"
// };
// const CONFIG = require('./public/information/config').config;
// firebase.initializeApp(CONFIG);
// const db = firebase.firestore();
// const userRef = db.collection('user').doc('GiPyiR86LfTUqGvilSUt')
// const userDoc = userRef.get()
// console.log(userDoc);
// }

// CAAA();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/display', displayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
