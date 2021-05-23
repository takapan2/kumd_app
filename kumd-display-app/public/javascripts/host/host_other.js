async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    const titleData = hostData.title;
    const switchData = hostData.switch;
    await getAndReflectHostImg('title',imageElement);
    await writeData(titleData,switchData);
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    location.href = '/login';
}

const fileContent = document.getElementById('file');
const returnButton = document.getElementById('return');

const titleElement = document.getElementById('title');
const imageElement = document.querySelector('img');

const displayCheckElement = document.querySelector('#display-check');
const rankingCheckElement = document.querySelector('#ranking-check');

const fileErrMsg = document.querySelector('#file-err');
const titleErrMsg = document.querySelector('#title-err');

const fileSubmitButton = document.querySelector('#file-submit-btn');
const siteTitleSubmitButton = document.querySelector('#site-title-submit-btn');
const siteAccessSubmitButton = document.querySelector('#site-access-submit-btn');

//ファイルが変更された際の処理
fileContent.addEventListener('change',function(e){
    file = e.target.files[0];
    console.log(file.size);
});

fileSubmitButton.addEventListener("click",()=>{
    if(window.confirm("変更を反映し、展示会サイト上で公開してよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        console.log("click fileSubmitButton");
        //validationのメッセージを一度非表示にする。
        fileErrMsg.innerText = "";
        titleErrMsg.innerText = "";
        validationFile(file);
        (async()=>{
            try {
                await fileHostCompressAndSave(file,'title');
                await wait(2);
                console.log("save finish!!");
                location.href = "/login/host";
            } catch (err) {
                console.log('err',err);
            }
        })();
    }
});

siteTitleSubmitButton.addEventListener("click",()=>{
    if(window.confirm("変更を反映し、展示会サイト上で公開してよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        console.log("click siteTitleSubmitButton");
        //validationのメッセージを一度非表示にする。
        fileErrMsg.innerText = "";
        titleErrMsg.innerText = "";
        //各inputのvalueを取得。
        const titleValue = document.getElementById('title').value;
        validationTitle(titleValue);
        (async()=>{
            try {
                await dataUpdate({title:titleValue},'host','Host');
                await wait(2);
                console.log("save finish!!");
                location.href = "/login/host";
            } catch (err) {
                console.log('err',err);
            }
        })();
    }
});

siteAccessSubmitButton.addEventListener("click",()=>{
    if(window.confirm("変更を反映し、展示会サイト上で公開してよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        console.log("click siteAccessSubmitButton");
        //validationのメッセージを一度非表示にする。
        fileErrMsg.innerText = "";
        titleErrMsg.innerText = "";
        //valueを取得。
        const displayCheck = displayCheckElement.checked;
        const rankingCheck = rankingCheckElement.checked;
        (async()=>{
            await dataUpdate({switch:{display:displayCheck,ranking:rankingCheck}},'host','Host');
            console.log("save finish!!");
            location.href = "/login/host";
        })();
    }
});

//account_edit固有　formに既存のデータを入力する。
function writeData(titleData,switchData){
    titleElement.value = titleData;
    if(switchData.display)displayCheckElement.click();
    if(switchData.ranking)rankingCheckElement.click();
}

function validationFile(file){
    var judge = 0;
    if(!file){
        fileErrMsg.innerText = VALIDATION.FILE.VAL;
        judge++;
    }else if(file.size>5*1024*1024){
        fileErrMsg.innerText = VALIDATION.FILE.SIZE;
        judge++;
    }
    if(judge!=0){
        loading.classList.add('loading-fadeaout');
        throw Error("Validation!!");
    }
}

function validationTitle(titleValue){
    var judge = 0;
    if(titleValue==""){
        titleErrMsg.innerText = VALIDATION.TITLE;
        judge++;
    }
    if(judge!=0){
        loading.classList.add('loading-fadeaout');
        throw Error("Validation!!");
    }
}