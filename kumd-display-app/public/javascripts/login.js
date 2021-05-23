async function thereUser(){
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
};
async function noUser(){
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
};

const loginButton = document.getElementById('login');
const registerBytton = document.getElementById('register');
const returnBytton = document.getElementById('return');
const loginErrMsg = document.querySelector('#login-err-msg');
const newErrMsg = document.querySelector('#new-err-msg');

loginButton.addEventListener("click",()=>{
    loading.classList.remove('loading-fadeaout');
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
                checkHostLogin(userCredential.user.uid);
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("body,html").animate({scrollTop: 0}, 1);//トップに移動
            loading.classList.add('loading-fadeaout');
            judgeLoginError(errorCode);
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});

registerBytton.addEventListener("click",()=>{
    loading.classList.remove('loading-fadeaout');
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
            $("body,html").animate({scrollTop: 0}, 1);//トップに移動
            loading.classList.add('loading-fadeaout');
            judgeNewError(errorCode);
            console.log("error_code >>>",errorCode );
            console.log('err',errorMessage);
        });
    } catch (err) {
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
        judgeNewError(err);
        console.log('err',err);
        console.log(`Error: ${JSON.stringify(err)}`)
    }
});

// loginButton.addEventListener("click",()=>{
    
// });

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