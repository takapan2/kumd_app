var file;
var uid;
var imgNum;
var imgUid;

const db = firebase.firestore();
const storage = firebase.storage();

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

// 定数等
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("There's a user");
        thereUser();
    } else {
        console.log("No user");
        noUser();
    }
});
//
async function thereUser(){
    try {
        uid = await firebase.auth().currentUser.uid;
    } catch (err){
        console.log(err);
    }
}
async function noUser(){
    location.href = "/login";
}


const fileContent = document.getElementById('file');
const submitButton = document.getElementById('submit-btn');
const returnButton = document.getElementById('return');

const fileErrMsg = document.querySelector('#file-err');
const gradeErrMsg = document.querySelector('#grade-err');
const sizeErrMsg = document.querySelector('#size-err');
const pennameErrMsg = document.querySelector('#penname-err');
const titleErrMsg = document.querySelector('#title-err');
const captionErrMsg = document.querySelector('#caption-err');

//ファイルが変更された際の処理
fileContent.addEventListener('change',function(e){
    file = e.target.files[0];
    console.log(file.size);
});

submitButton.addEventListener("click",()=>{
    console.log("click submitButton");
    //validationのメッセージを一度非表示にする。
    fileErrMsg.innerText = "";
    gradeErrMsg.innerText = "";
    sizeErrMsg.innerText = "";
    pennameErrMsg.innerText = "";
    titleErrMsg.innerText = "";
    captionErrMsg.innerText = "";
    //各inputのvalueを取得。
    const gradeValue = document.getElementById('grade-select').value;
    const sizeValue = document.getElementById('size-select').value;
    const pennameValue = document.getElementById('penname').value;
    const titleValue = document.getElementById('title').value;
    const captionValue = document.getElementById('caption').value;
    validation( file, gradeValue, sizeValue, pennameValue, titleValue, captionValue);
    const imgsObject = {
        grade: gradeValue,
        size: sizeValue,
        penname: pennameValue,
        title: titleValue,
        caption: captionValue,
    }
    const crientsObject = {
        commentNum: 0,
        vote: 0,
    };
    console.log("submitObject", imgsObject);
    //ここにsubmitbtn
    submitBtnFunc(uid, imgsObject, crientsObject, file);
});

returnButton.addEventListener("click",()=>{
    if(window.confirm('変更内容は保存されませんが戻ってもよろしいでしょうか？')){
        location.href = '/login/account';
    }
});

async function submitBtnFunc(uid, imgsObject, crientsObject, file ){
    try{
        const userData = await getStoreData('users',uid);
        imgNum = userData.imgNum + 1;
        imgUid = `${uid}-${imgNum}`;
        imgChild = `imgs/${imgUid}.jpeg`;
        const UserObject = {
            id: imgUid,
            imgNum: imgNum,
            [`img${imgNum}`]:imgUid,
        };
        await fileCompressAndSave(file,imgChild);
        await dataUpdate(UserObject,'users',uid);
        await setStoreData(imgsObject, "imgs", imgUid);
        await setStoreData(crientsObject, "crients", imgUid);
        console.log("save finish!!");
        location.href = "/login/account";
    }catch(err){
        console.log("submitBtnFunc err",err);
    }
}

function validation(file,gradeValue, sizeValue, pennameValue, titleValue, captionValue){
    var judge = 0;
    if(!file){
        fileErrMsg.innerText = VALIDATION.FILE.VAL;
        judge++;
    }else if(file.size>5*1024*1024){
        fileErrMsg.innerText = VALIDATION.FILE.SIZE;
        judge++;
    }
    if(gradeValue==""){
        gradeErrMsg.innerText = VALIDATION.GRADE;
        judge++;
    }
    if(sizeValue==""){
        sizeErrMsg.innerText = VALIDATION.SIZE;
        judge++;
    }
    if(pennameValue==""){
        pennameErrMsg.innerText = VALIDATION.PENNAME;
        judge++;
    }
    if(titleValue==""){
        titleErrMsg.innerText = VALIDATION.TITLE;
        judge++;
    }
    if(captionValue==""){
        captionErrMsg.innerText = VALIDATION.CAPTION;
        judge++;
    }
    if(judge!=0)throw Error("Validation!!");
}

//共通関数ーーーーーーーーーーーーーーーーーーーー

//ファイル圧縮しを保存しするところまで行う。
function fileCompressAndSave(file,child){
    return new Compressor(file,{
        quality:judgeQuality(file.size),
        success(result) {
            console.log(result);
            saveStorageData(result,child);
        },
        error(err){
            console.log('Compressor ERR',err);
        }
    });
}
//firestorageに画像を保存する。
function saveStorageData(file,child){
    var storageRef = firebase.storage().ref().child(child);
    storageRef.put(file);
}

//ファイルのサイズによって圧縮率を変更する。
function judgeQuality(fileSize){
    const M = 1024;
    if(fileSize<M*0.5){
        console.log(0.8);
        return 0.8;
    }else if(fileSize<M*M){
        console.log(0.6);
        return 0.6;
    }else if(fileSize<2*M*M){
        console.log(0.4);
        return 0.4;
    }else{
        console.log(0.2);
        return 0.2;
    }
}

async function getStoreData(collection,doc){
    const storeRef = db.collection(collection).doc(doc);
    const storeData = await storeRef.get();
    if(await storeData.exists){
        return storeData.data();
    }else{
        throw new Error(`No such document! collection= ${collection}, doc= ${doc}`);
    }
}

//firestoreからデータを取得する。
async function getStoreData(collection,doc){
    const storeRef = db.collection(collection).doc(doc);
    const storeData = await storeRef.get();
    if(await storeData.exists){
        return storeData.data();
    }else{
        throw new Error(`No such document! collection= ${collection}, doc= ${doc}`);
    }
}

function dataUpdate(object,collection,document){
    const storeRef = db.collection(collection).doc(document);
    return storeRef.update(object);
}

//firestoreにデータを保存する
function setStoreData(object, collection, doc){
    const storeRef = db.collection(collection).doc(doc);
    return storeRef.set(object);
}