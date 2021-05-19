firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("There's a user");
        // console.log('uid',firebase.auth().currentUser.uid);
    } else {
        console.log("No user");
        location.href='/login';
    }
});

var file;
var fileContent = document.getElementById('file');
var fileButton = document.getElementById('submit-btn');

const fileErrMsg = document.querySelector('#file-err');
const gradeErrMsg = document.querySelector('#grade-err');
const sizeErrMsg = document.querySelector('#size-err');
const pennameErrMsg = document.querySelector('#penname-err');
const titleErrMsg = document.querySelector('#title-err');
const captionErrMsg = document.querySelector('#caption-err');

fileContent.addEventListener('change',function(e){
    file = e.target.files[0];
    console.log(file.size);
});

fileButton.addEventListener("click",()=>{
    console.log("click fileButton");
    fileErrMsg.innerText = "";
    gradeErrMsg.innerText = "";
    sizeErrMsg.innerText = "";
    pennameErrMsg.innerText = "";
    titleErrMsg.innerText = "";
    captionErrMsg.innerText = "";
    const gradeValue = document.getElementById('grade-select').value;
    const sizeValue = document.getElementById('size-select').value;
    const pennameValue = document.getElementById('penname').value;
    const titleValue = document.getElementById('title').value;
    const captionValue = document.getElementById('caption').value;
    validation(file,gradeValue, sizeValue, pennameValue, titleValue, captionValue);
    console.log("gradeValue",gradeValue);
    console.log("sizeValue",sizeValue);
    console.log("pennameValue",pennameValue);
    console.log("titleValue",titleValue);
    console.log("captionValue",captionValue);
    const uid = firebase.auth().currentUser.uid;
    var imgNum;
    var usersData;
    const db = firebase.firestore();
    //既に画像が公開されているかをチェック
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc)=>{
        if (doc.exists) {
            console.log("Document data:", doc.data());
            usersData = doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        imgNum = usersData.imgNum+1;
        usersData["img" + imgNum ] = uid +"-"+ imgNum;
        usersData["imgNum"] = imgNum;
        console.log("userData",usersData);
        //ユーザーの保存(firestore)
        db.collection("users").doc(uid).set(usersData)
            .then(() => {
                console.log("Users Data successfully written!");
            })
            .catch((error) => {
                console.error("Error writing Users Data: ", error);
        });
        //イラストの保存(firestore)
        db.collection("imgs").doc(uid +"-"+ imgNum ).set({
            grade: gradeValue,
            size: sizeValue,
            penname: pennameValue,
            title: titleValue,
            caption: captionValue,
        })
        .then(() => {
            console.log("Imgs Data successfully written!");
        })
        .catch((error) => {
            console.error("Error writing Imgs Data: ", error);
        });
        //投票数やコメントの保管
        db.collection("crients").doc(uid +"-"+ imgNum ).set({
            accountNum: 0,
            vote: 0,
        })
        .then(() => {
            console.log("Crients Data successfully written!");
        })
        .catch((error) => {
            console.error("Error writing Crients Data: ", error);
        });
        //イラストの保存(storage)
        //イラスト一枚につき100kBほどに抑えたい。sizeとしては100000としたい。
        new Compressor(file,{
            quality:judgeQuality(file.size),
            success(result) {
            console.log(result);
            var storageRef = firebase.storage().ref().child("imgs/"+ uid +"-"+ imgNum+".jpg");
            storageRef.put(result);
            },
            error(err){
                console.log('Compressor ERR',err);
            }
        });
    })
    .catch((err)=>{
        console.log("Error getting Users Data:", err)
    })
});

const returnButton = document.getElementById('return');
returnButton.addEventListener("click",()=>{
    if(window.confirm('変更内容は保存されませんが戻ってもよろしいでしょうか？')){
        location.href = '/login/account';
    }
});

// function judgeQuality(fileSize){
//     console.log("judgeQuality");
//     if(fileSize<500000){
//         console.log(300000/fileSize);
//         return 100000/fileSize;
//     }else if(fileSize<1500000){
//         console.log(500000/fileSize);
//         return 150000/fileSize;
//     }else if(fileSize<3000000){
//         console.log(750000/fileSize);
//         return 250000/fileSize;
//     }else if(fileSize<10000000){
//         console.log(1000000/fileSize);
//         return 1000000/fileSize;
//     }else{
//         console.log(10000000/fileSize);
//         return 10000000/fileSize;
//     }
// }
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

function validation(file,gradeValue, sizeValue, pennameValue, titleValue, captionValue){
    var judge = 0;
    if(!file){
        fileErrMsg.innerText = VALIDATION.FILE.VAL;
        judge++;
    }
    if(file>5*1024*1024){
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
