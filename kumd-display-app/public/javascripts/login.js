var firebaseConfig = {
    apiKey: "AIzaSyA4chVLLT13u2-zlfDlt7p5GXD_98DgY2Q",
    authDomain: "kumd-app.firebaseapp.com",
    databaseURL: "https://kumd-app-default-rtdb.firebaseio.com",
    projectId: "kumd-app",
    storageBucket: "kumd-app.appspot.com",
    messagingSenderId: "28972770999",
    appId: "1:28972770999:web:59ad63f788f272e4868f32",
    measurementId: "G-YPKJW425F5"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("There's a user");
    } else {
        console.log("No user");
    }
});

const loginButton = document.getElementById('login');
const registerBytton = document.getElementById('register');

loginButton.addEventListener("click",()=>{
    console.log("click loginButton");
    const mailAddress = document.getElementById('mailAddress').value;
    const password = document.getElementById('password').value;
    console.log("mailAddress", mailAddress);
    console.log("password", password);
    try {
        firebase.auth().signInWithEmailAndPassword(mailAddress, password)
        .then((userCredential) => {
            if(userCredential!=null){
                console.log('success!');
                location.href='/login/account';
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});

registerBytton.addEventListener("click",()=>{
    console.log("click registerBytton");
    const mailAddress = document.getElementById('mailAddress').value;
    const password = document.getElementById('password').value;
    console.log("mailAddress", mailAddress);
    console.log("password", password);
    try {
        firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
        .then((userCredential) => {
            const db = firebase.firestore();
            console.log(userCredential.user.uid);
            db.collection("users").doc(userCredential.user.uid).set({
                imgNum:0
            })
            .then(() => {
                console.log("Document successfully written!");
                if(userCredential!=null){
                    console.log('success!');
                    location.href='/login/account';
                }
            })
            .catch((error) => {
                    console.error("Error writing document: ", error);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});