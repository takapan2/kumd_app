//firebase firestore関連の関数-----------------------------------------------------------

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

//firestoreにデータを保存する
function setStoreData(object, collection, doc){
    const storeRef = db.collection(collection).doc(doc);
    return storeRef.set(object);
}

//firestoreでupdate処理をする。
function dataUpdate(object,collection,document){
    const imgsRef = db.collection(collection).doc(document);
    return imgsRef.update(object);
}

//firestoreでdocumentを削除する
function deleteStoreDocument(collection,imgUid){
    var storeRef = db.collection(collection).doc(imgUid);
    return storeRef.delete();
}

//firestoreでfieldを削除する
function deleteStoreField(collection, uid, value) {
    var storeRef = db.collection(collection).doc(uid);
    return storeRef.update({
        [`img${value}`]: firebase.firestore.FieldValue.delete(),
    });
}

//firebase firestore関連の関数-----------------------------------------------------------

//firebase storage関連の関数-------------------------------------------------------------

//firestorageに画像を保存する。
async function saveStorageData(file,child){
    var storageRef = firebase.storage().ref().child(child);
    return await storageRef.put(file);
}

//storageでファイルを削除する。
function deleteStorageFile(imgUid){
    var storageRef = storage.ref();
    return storageRef.child(`imgs/${imgUid}.jpg`).delete();
}

//画像のデータを全て取得する関数
function getAllImgsData(){
    const imgsRef = db.collection('imgs').orderBy("size").orderBy("grade");
    return imgsRef.get();
}

function getRankingData(){
    const rankingRef = db.collection('crients').orderBy("vote", "desc").limit(10);
    return rankingRef.get();
}

//firebase storage関連の関数--------------------------------------------------------------

//複合関数--------------------------------------------------------------------------------

//画像の取得から反映まで行います。
function getAndReflectUserImg(imgUid, element) {
    const storageRef = storage.ref();
    console.log("imgUid", imgUid);
    storageRef.child("imgs/" + imgUid + ".jpg").getDownloadURL()
    .then(function(url) {
        //エレメントに画像を反映
        element.src = url;
    }).catch((err) => {
        // Handle any errors
        console.log("getAndReflectUserImgErr", err);
    });
}

//delete時
async function deleteFunc(value, uid, goalURL) {
    if (await window.confirm("一度削除したイラスト情報は元に戻りません。削除してもよろしいでしょうか？")) {
        try{
            await loading.classList.remove('loading-fadeaout');
            const imgUid = `${uid}-${value}`;
            await deleteStoreDocument('imgs',imgUid);
            await deleteStoreDocument('crients',imgUid);
            await deleteStoreField('users',uid,value);
            await deleteStorageFile(imgUid);
            console.log("delete function all complete!");
            location.href = goalURL;
        }catch(err){
            console.log('deleteFunc Err',err);
        }
    }
}

async function fileCompressAndSave(file,child){
    return await new Compressor(file,{
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

//データを書き換える際の関数。
async function updateFunc(object, collection, imgUid, goalURL){
    try{
        const imgUid = await `${uid}-${value}`;
        await dataUpdate(object,collection, imgUid)
        location.href= goalURL;
    }catch(err){
        console.log('updateFunc Err',err);
    }
}

//複合関数--------------------------------------------------------------------------------

//その他の関数-----------------------------------------------------------------------------

//クエリパラメータを取得し、オブジェクトとして返す。
function getQueryObject(){
    var queryString = window.location.search;
    var queryObject = new Object();
    if(queryString){
        queryString = queryString.substring(1);
        var parameters = queryString.split('&');

        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            queryObject[paramName] = paramValue;
        }
    }
    return queryObject;
}

// オブジェクトのキーの順番に並び替える。
function getDecSort(object) {
    var pairs = Object.entries(object);
    pairs.sort(function(p1, p2) {
        var p1Key = parseInt(p1[0].replace(/[^0-9]/g, ""));
        var p2Key = parseInt(p2[0].replace(/[^0-9]/g, ""));
        if (p1Key < p2Key) return -1;
        if (p1Key > p2Key) return 1;
        return 0;
    });
    return Object.fromEntries(pairs);
}

//collectonがusersの際のデータ整理
function validateUsersData(data){
    var usersData = data;
    delete usersData.imgNum;
    usersData = getDecSort(usersData);
    return usersData;
}

//queryObjectから特定のvalueを取得する　loseURLとはvalueが存在しなかった場合の遷移先を指す。
function getQueryValue( queryObject, key, loseURL){
    if(queryObject[key]){
        return queryObject[key];
    }else{
        console.log(`No ${key}`);
        location.href=loseURL;
    }
}

//ファイルのサイズによって圧縮率を変更する。
function judgeQuality(fileSize){
    const M = 1024;
    if(fileSize<M*0.3){
        return 0.8;
    }else if(fileSize<M*0.5){
        console.log(0.8);
        return 0.6;
    }else if(fileSize<M*M){
        console.log(0.6);
        return 0.4;
    }else if(fileSize<2*M*M){
        console.log(0.4);
        return 0.2;
    }else{
        console.log(0.2);
        return 0.15;
    }
}

//文字数制限に関するエラー表示
function textValidation(element,wordLength){
    $(document).on('keyup', element, function(e) {
        if($(this).val().length > wordLength){
            showErrMsg($(".text-error"));
        }
    });
}

//エラーを表示させる。
function showErrMsg(target) {
    target.fadeIn();
    setTimeout(function(){
        target.fadeOut();
    }, 2000);
}

//wait関数はsec秒間待つ処理をおこなう。
const wait = (sec) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sec*1000);
    });
};

//logout用の関数
function logout(){
    firebase.auth().signOut().then(()=>{
        console.log("ログアウトしました");
        location.href = `/login`;
    }).catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
}

//その他の関数-------------------------------------------------------------------------------

//hostの関数-------------------------------------------------------------------------------

//ログイン時にuserIdがhostがどうか判別する。hostの場合hostURLに遷移。
async function checkHostLogin(uid){
    try{
        const hostData = await getStoreData('host','Host');
        if(hostData.id == uid ){
            location.href = hostData.url;
        }else{
            location.href='/login/account';
        }
    }catch(err){
        console.log('err',err);
    }
}

//hostかどうか判別する。hostでない場合はログイン画面まで遷移する。
async function checkHost(uid){
    try{
        const hostData = await getStoreData('host','Host');
        if(hostData.id != uid ){
            location.href='/login';
        }else{
            return hostData;
        }
    }catch(err){
        console.log('err',err);
    }
}

//host時における画像の取得と反映
function getAndReflectHostImg(imgUid, element) {
    const storageRef = storage.ref();
    storageRef.child("host/" + imgUid + ".jpg").getDownloadURL()
    .then(function(url) {
        //エレメントに画像を反映
        element.src = url;
    }).catch((err) => {
        // Handle any errors
        console.log("getAndReflectUserImgErr", err);
    });
}

async function fileHostCompressAndSave(file,child){
    valChild = `host/${child}.jpg`;
    return await new Compressor(file,{
        quality:judgeQuality(file.size),
        success(result) {
            saveStorageData(result,valChild);
        },
        error(err){
            console.log('Compressor ERR',err);
        }
    });
}

//host-check,サイトのアクセス制限の関数
async function displayAccess(){
    try{
        const hostData = await getStoreData('host','Host');
        const displaySwitch = hostData.switch.display;
        if(displaySwitch)location.href = '/display/sorry';
    }catch(err){
        console.log('err',err);
    }
}

async function rankingAccess(){
    try{
        const hostData = await getStoreData('host','Host');
        const rankingSwitch = hostData.switch.ranking;
        if(rankingSwitch)location.href = '/display/sorry';
    }catch(err){
        console.log('err',err);
    }
}

//hostの関数-------------------------------------------------------------------------------