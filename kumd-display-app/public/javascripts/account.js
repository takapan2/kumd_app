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
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

const fileSize = 1000000; //画像のサイズ指定

fileContent.addEventListener('change',function(e){
    file = e.target.files[0];
});

fileButton.addEventListener("click",()=>{
    console.log("click fileButton");
    const gradeValue = document.getElementById('grade-select').value;
    const sizeValue = document.getElementById('size-select').value;
    const pennameValue = document.getElementById('penname').value;
    const titleValue = document.getElementById('title').value;
    const captionValue = document.getElementById('caption').value;
    console.log("gradeValue",gradeValue);
    console.log("sizeValue",sizeValue);
    console.log("pennameValue",pennameValue);
    console.log("titleValue",titleValue);
    console.log("captionValue",captionValue);
    const qualityNum = fileSize/file.size;
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
        console.log('imgData',usersData);
        imgNum = usersData.imgNum+1;
        console.log("imgNum",imgNum)
        console.log("uid + imgNum",uid +"-"+ imgNum);
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
            id: uid +"-"+ imgNum,
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
            id: uid +"-"+ imgNum,
            vote:0,
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
            quality:qualityNum,
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