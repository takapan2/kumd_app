async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    const demoData = hostData.demo;
    await getAndReflectHostImg('demo',imageElement);
    await writeEditData(demoData);
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    location.href = '/login';
}

const submitButton = document.getElementById('submit-btn');
const fileContent = document.getElementById('file');
const returnButton = document.getElementById('return');

const pennameElement = document.getElementById('penname');
const titleElement = document.getElementById('title');
const captionElement = document.getElementById('caption');
const imageElement = document.querySelector('img');

const fileErrMsg = document.querySelector('#file-err');
const pennameErrMsg = document.querySelector('#penname-err');
const titleErrMsg = document.querySelector('#title-err');
const captionErrMsg = document.querySelector('#caption-err');

//ファイルが変更された際の処理
fileContent.addEventListener('change',function(e){
    file = e.target.files[0];
});

submitButton.addEventListener("click",()=>{
    if(window.confirm("変更を反映し、展示会サイト上で公開してよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        //validationのメッセージを一度非表示にする。
        fileErrMsg.innerText = "";
        pennameErrMsg.innerText = "";
        titleErrMsg.innerText = "";
        captionErrMsg.innerText = "";
        //各inputのvalueを取得。
        const pennameValue = document.getElementById('penname').value;
        const titleValue = document.getElementById('title').value;
        const captionValue = document.getElementById('caption').value;
        validation(file, pennameValue, titleValue, captionValue);
        const demo = {
            penname: pennameValue,
            title: titleValue,
            caption: captionValue,
        };
        submitBtnFunc(uid, demo, file);
    }
});

returnButton.addEventListener("click",()=>{
    if(window.confirm('変更内容は保存されませんが戻ってもよろしいでしょうか？')){
        location.href = '/login/host';
    }
});

//account_edit固有　formに既存のデータを入力する。
function writeEditData(imgData){
    pennameElement.value = imgData.penname;
    titleElement.value = imgData.title;
    captionElement.value = imgData.caption;
}

async function submitBtnFunc(uid, demo, file ){
    try{
        await fileHostCompressAndSave(file,'demo');
        await dataUpdate({demo},'host','Host');
        await wait(2);
        location.href = "/login/host";
    }catch(err){
        console.log("submitBtnFunc err",err);
    }
}

function validation(file, pennameValue, titleValue, captionValue){
    var judge = 0;
    if(!file){
        fileErrMsg.innerText = VALIDATION.FILE.VAL;
        judge++;
    }else if(file.size>5*1024*1024){
        fileErrMsg.innerText = VALIDATION.FILE.SIZE;
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