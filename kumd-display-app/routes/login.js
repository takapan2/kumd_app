var express = require('express');
const multer = require('multer');
var router = express.Router();
var admin = require('firebase-admin');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login/login');
});

router.get('/account', function(req, res, next) {
    res.render('login/account_menu');
});

router.get('/account/new', function(req, res, next) {
    res.render('login/account_new');
});

router.get('/account/edit', function(req, res, next) {
    res.render('login/account_edit');
});

router.get('/account/comment', function(req, res, next) {
    res.render('login/account_comment');
});

router.post('/register',(req,res,next)=>{
    (async () => {
        try {
        const firebase = require('firebase')
        console.log(req.body)
        const CONFIG = require('../public/information/config').config
        firebase.initializeApp(CONFIG)
        firebase.auth().createUserWithEmailAndPassword(req.body.mailAddress, req.body.password)
            .then((userCredential) => {
                const cert = {
                    projectId: process.env.PROJECT_ID,
                    clientEmail: process.env.CLIENT_EMAIL,
                    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
                }
                    //console.log(cert)
                    admin.initializeApp({
                    credential: admin.credential.cert(cert),
                })
                var user = userCredential.user;
                console.log(user.uid);
                // admin.auth().createCustomToken(user.uid).then((customToken) => {
                //     console.log(customToken);
                // })
                // .catch((error) => {
                //     console.log('Error creating custom token:', error);
                // });

                //
(async () => {
  try {
    const firebase = require('firebase')
    // const CONFIG = require('./public/information/config').config
    // firebase.initializeApp(CONFIG)
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
                //
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("error_code >>>",errorCode );
                console.log('err',errorMessage);
            });
            res.render('login/account');
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`)
        }
    })();
    //res.redirect('/login');
});

router.post('/signin',(req,res,next)=>{
    // (async () => {
    //     try {
    //     const firebase = require('firebase')
    //     console.log(req.body)
    //     const CONFIG = require('../public/information/config').config
    //     firebase.initializeApp(CONFIG)
    //     firebase.auth().signInWithEmailAndPassword(req.body.mailAddress, req.body.password)
    //         .then((userCredential) => {
    //             const cert = {
    //                 projectId: process.env.PROJECT_ID,
    //                 clientEmail: process.env.CLIENT_EMAIL,
    //                 privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    //             }
    //                 //console.log(cert)
    //                 admin.initializeApp({
    //                 credential: admin.credential.cert(cert),
    //             })
    //             var user = userCredential.user;
    //             console.log(user.uid);
    //             console.log(firebase.auth().currentUser)
    //             //
    //             // user.getIdToken(true)
    //             // .then((idToken) => {
    //             //   console.log(idToken);
    //             //   admin.auth().verifyIdToken(idToken).then((decodedToken) => {
    //             //     const uid = decodedToken.uid;
    //             //     console.log('uid',uid);
    //             //     })
    //             //     .catch((error) => {
    //             //     // Handle error
    //             //     });
    //             // })
    //             // .catch((error) => {
    //             //     console.log(error);
    //             // });
    //             //

    //             admin.auth().createCustomToken(user.uid).then((customToken) => {
    //                 console.log(customToken);
    //             })
    //             .catch((error) => {
    //                 console.log('Error creating custom token:', error);
    //             });
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             console.log("error_code >>>",errorCode );
    //             console.log('err',errorMessage);
    //         });
    //         //firebase.initializeApp(CONFIG)
    //         res.render('login/account');
    //     } catch (err) {
    //         console.log(`Error: ${JSON.stringify(err)}`)
    //     }
    // })();
    res.redirect('/login');
});

// router.post('/account',  upload.any(),(req,res,next)=>{
//     console.log(req.body);
//     console.log(req.files[0].buffer);
//     // (async () => {
//     //     try {
//     //     const firebase = require('firebase')
//     //     require("firebase/storage");
//     //     const CONFIG = require('../public/information/config').config
//     //     firebase.initializeApp(CONFIG)
//     //     var storage = firebase.storage();
//     //     var storageRef = storage.ref();
//     //     var paintRef = storageRef.child('mountains.jpg');
//     //     paintRef.put(req.files[0].buffer).then(function(snapshot) {
//     //         console.log('Uploaded a blob or file!');
//     //     });
//     //     } catch (err) {
//     //         console.log(`Error: ${JSON.stringify(err)}`)
//     //         console.log(err);
//     //     }
//     // })();
//     res.redirect('/login/account');
// });

module.exports = router;