async function thereUser(){
    try {
        const queryObject = await getQueryObject();
        value = await getQueryValue( queryObject, 'value', '/login/account');
        uid = await firebase.auth().currentUser.uid;
        imgUid = `${uid}-${value}`;

        const imgData = await getStoreData('imgs',imgUid);
        await writeEditData(imgData);
        await getAndReflectUserImg(imgUid,imageElement);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    } catch (err){
        console.log(err);
    }
}
async function noUser(){
    location.href = "/login";
}

const submitButton = document.getElementById('submit-btn');
const deleteButton = document.getElementById('delete');
const returnButton = document.getElementById('return');

const gradeElement = document.getElementById('grade-select');
const sizeElement = document.getElementById('size-select');
const pennameElement = document.getElementById('penname');
const titleElement = document.getElementById('title');
const captionElement = document.getElementById('caption');
const imageElement = document.querySelector('img');

const gradeErrMsg = document.querySelector('#grade-err');
const sizeErrMsg = document.querySelector('#size-err');
const pennameErrMsg = document.querySelector('#penname-err');
const titleErrMsg = document.querySelector('#title-err');
const captionErrMsg = document.querySelector('#caption-err');

submitButton.addEventListener("click",()=>{
    if(window.confirm("変更を反映し、展示会サイト上で公開してよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        console.log("click fileButton");
        //validationのメッセージを一度非表示にする。
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
        validation(gradeValue, sizeValue, pennameValue, titleValue, captionValue);
        const imgObject = {
            grade: gradeValue,
            size: sizeValue,
            penname: pennameValue,
            title: titleValue,
            caption: captionValue,
        };
        console.log("imgObject",imgObject);
        updateFunc(imgObject,FIREBASE_DATA.COLLECTION.IMGS,imgUid,'/login/account');
    }
});

deleteButton.addEventListener("click",()=>{
    deleteFunc(value,uid,"/login/account/");
});

returnButton.addEventListener("click",()=>{
    if(window.confirm('変更内容は保存されませんが戻ってもよろしいでしょうか？')){
        location.href = '/login/account';
    }
});

//account_edit固有　formに既存のデータを入力する。
function writeEditData(imgData){
    gradeElement.value = imgData.grade;
    sizeElement.value = imgData.size;
    pennameElement.value = imgData.penname;
    titleElement.value = imgData.title;
    captionElement.value = imgData.caption;
}

function validation(gradeValue, sizeValue, pennameValue, titleValue, captionValue){
    var judge = 0;
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