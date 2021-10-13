async function thereUser(){
    try {
        await displayAccess();
        uid = await firebase.auth().currentUser.uid;
        textValidation('#caption',150);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
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
    if(window.confirm('イラスト情報を登録し、展示会サイトに公開してもよろしいでしょうか？')){
        loading.classList.remove('loading-fadeaout');
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
        const JoinRankingValue = document.getElementById('join_ranking').checked;
        validation( file, gradeValue, sizeValue, pennameValue, titleValue, captionValue);
        var imgsObject = {
            grade: gradeValue,
            size: sizeValue,
            penname: pennameValue,
            title: titleValue,
            caption: captionValue,
            join_ranking: JoinRankingValue,
            commentNum: 0,
            comment: [],
            vote: 0,
        }
        console.log("submitObject", imgsObject);
        submitBtnFunc(uid, imgsObject, file);
    }
});

returnButton.addEventListener("click",()=>{
    if(window.confirm('変更内容は保存されませんが戻ってもよろしいでしょうか？')){
        location.href = '/login/account';
    }
});

async function submitBtnFunc(uid, imgsObject, file ){
    try{
        const userData = await getStoreData('users',uid);
        imgNum = userData.imgNum + 1;
        imgUid = `${uid}-${imgNum}`;
        imgChild = `imgs/${imgUid}.jpg`;
        const UserObject = {
            imgNum: imgNum,
            [`img${imgNum}`]:imgUid,
        };
        imgsObject.id = imgUid;
        const imgObject = {
            [ imgUid ] : imgsObject
        };
        await fileCompressAndSave(file,imgChild);
        await dataUpdate(UserObject,'users',uid);
        await dataUpdate(imgObject,'images','imgs');
        console.log("save finish!!");
        await wait(2); //5MB近いファイルだと何故か反映されないことがあるため。
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
    if(judge!=0){
        loading.classList.add('loading-fadeaout');
        throw Error("Validation!!");
    }
}