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

const ERROR_DATA ={
    PASS_REGEX: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,16}$/i,
    LOGIN:{
        'auth/wrong-password':'メールもしくはパスワードに誤りがあります。',
        'auth/invalid-email':'メールもしくはパスワードに誤りがあります。',
        'other':'メールもしくはパスワードに誤りがあります。',
    },
    NEW: {
        'auth/invalid-email':'メールアドレスの形式が正しくありません。',
        'auth/weak-password':'パスワードは半角英字と半角数字を含めた6-16文字以内でお願いします。',
        'auth/email-already-in-use':'メールアドレスは既に使用されています。',
        'other':'メールアドレスまたはパスワードを変更し、再度お試しください。',
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("There's a user");
    } else {
        console.log("No user");
    }
});

const loginButton = document.getElementById('login');
const registerBytton = document.getElementById('register');
const loginErrMsg = document.querySelector('#login-err-msg');
const newErrMsg = document.querySelector('#new-err-msg');

loginButton.addEventListener("click",()=>{
    console.log("click loginButton");
    newErrMsg.innerText = "";
    loginErrMsg.innerText = "";
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
            judgeLoginError(errorCode);
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});

registerBytton.addEventListener("click",()=>{
    console.log("click registerBytton");
    newErrMsg.innerText = "";
    loginErrMsg.innerText = "";
    const mailAddress = document.getElementById('mailAddress').value;
    const password = document.getElementById('password').value;
    console.log("mailAddress", mailAddress);
    console.log("password", password);
    try {
        if(!ERROR_DATA.PASS_REGEX.test(password))throw 'auth/weak-password';
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
            judgeNewError(errorCode);
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        judgeNewError(err);
        console.log('err',err);
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});

function judgeLoginError(err){
    var err_message="";
    for(const prop in ERROR_DATA.LOGIN){
        console.log(err+"  "+prop);
        if(err == prop)err_message=ERROR_DATA.LOGIN[prop];
    }
    if(err_message=="")err_message=ERROR_DATA.LOGIN['other'];
    loginErrMsg.innerText = err_message;
}

function judgeNewError(err){
    var err_message="";
    console.log(newErrMsg);
    for(const prop in ERROR_DATA.NEW){
        if(err == prop)err_message=ERROR_DATA.NEW[prop];
    }
    if(err_message=="")err_message=ERROR_DATA.NEW['other'];
    newErrMsg.innerText = err_message;
}