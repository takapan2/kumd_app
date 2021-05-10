var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var displayRouter = require('./routes/display');
var loginRouter = require('./routes/login');

var app = express();

var object = {
  name:"貴也",
  age:'21',
}
object["name"+1] = 3;

console.log(object);

// (async () => {
//   try {
//     const firebase = require('firebase')
//     const CONFIG = require('./public/information/config').config
//     firebase.initializeApp(CONFIG)
//     const db = firebase.firestore()

//     // const userRef = db.collection('users').doc('thGMG3FJDTYCckTaKEBa3gBMG4p2')
//     // const userDoc = await userRef.get()
//     // if (userDoc.exists) {
//     //   console.log(userDoc.id)
//     //   console.log(userDoc.data())
//     //   console.log(userDoc.get('name'))
//     //   //console.log(userDoc)
//     // } else {
//     //   console.log('No such document!')
//     // }
//     // await db.app.delete()
//     db.collection("users").get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//       });
//   });
//   } catch (err) {
//     console.log(`Error: ${JSON.stringify(err)}`)
//   }
// })()

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
app.use('/login',loginRouter);

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
