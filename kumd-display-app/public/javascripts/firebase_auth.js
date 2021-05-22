var file;
var uid;
var imgNum;
var imgUid;
var value;

const db = firebase.firestore();
const storage = firebase.storage();
const fragment = document.createDocumentFragment();

const loading = document.getElementById('loading');

const VALIDATION = {
    FILE:{
        VAL:"ファイルを選択してください。",
        SIZE:"5MB以下のファイルを選択してください。",
    },
    GRADE:"回生を選択してください。",
    SIZE:"サイズを選択してください。",
    PENNAME:"ペンネームを入力してください。",
    TITLE:"タイトルを入力してください。",
    CAPTION:"説明文を入力してください。",
}

const FIREBASE_DATA ={
    COLLECTION:{
        CRIENTS:'crients',
        IMGS:'imgs',
        USERS:'users',
    }
}
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
        'auth/email-already-in-use':'そのメールアドレスは既に使用されています。',
        'other':'メールアドレスまたはパスワードを変更し、再度お試しください。',
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("There's a user");
        thereUser();
    } else {
        console.log("No user");
        noUser();
    }
});