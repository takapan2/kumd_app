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
function deleteStoreField(collection, doc, key) {
    var storeRef = db.collection(collection).doc(doc);
    return storeRef.update({
        [key]: firebase.firestore.FieldValue.delete(),
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

// 画像を回生→サイズ順に変更する(配列を返す。)
function sortImgs(imgData){
    return Object.keys(imgData).map(key =>{ return imgData[key];})
    .sort((a, b)=>Number(a.img_order) - Number(b.img_order))
    .sort((a, b)=>Number(a.size) - Number(b.size))
    .sort((a, b)=>Number(a.grade) - Number(b.grade))
}

// 画像URLを取得する。
async function getImg(imgUid) {
    // return
    const storageRef = storage.ref();
    return new Promise((resolve, reject) => {
        storageRef.child("imgs/" + imgUid + ".jpg").getDownloadURL()
            .then((url) => {
                resolve(url);
            }).catch((err) => {
                reject("getAndReflectUserImgErr", err);
        });
    })
}

//firebase storage関連の関数--------------------------------------------------------------

//複合関数--------------------------------------------------------------------------------

//画像の取得から反映まで行います。

async function ReflectUserImg(url, element, on) {
    return Promise.all[ 
        new Promise( async (resolve, reject) => {
            element.src = await url;
            if(on != 'on') return await
            await wait(2)
            const imgRatio = element.width / element.height;
            imgRatio < 1 ? element.classList.add("vertical") : element.classList.add("side");
            resolve()
        })
    ]
}

async function ReflectDisplayUserImg(url, element, on) {
    return Promise.all[ 
        new Promise( async (resolve, reject) => {
            element.src = await url;
            if(on != 'on') return await
            await wait(2)
            meter_count++
            const imgRatio = element.width / element.height;
            document.querySelector('.reading_mater_content').style.width = await `${Number(meter_count)*100/Number(Object.keys(imgData).length)}%`;
            imgRatio < 1 ? element.classList.add("vertical") : element.classList.add("side");
            resolve()
        })
    ]
}

//delete時
async function deleteFunc(uid, imgUid, goalURL) {
    if (await window.confirm("一度削除したイラスト情報は元に戻りません。削除してもよろしいでしょうか？")) {
        await loading.classList.remove('loading-fadeaout');
        await deleteStoreField('images','imgs',imgUid);
        await deleteStoreField('users',uid,`img${imgUid.split('-')[1]}`);
        await deleteStorageFile(imgUid);
        location.href = goalURL;
    }
}

// 画像を圧縮して保存
async function fileCompressAndSave(file,child){
    const result = await fileCompress(file);
    await saveStorageData(result,child);
}

// 画像の圧縮
async function fileCompress(file){
    return await new Promise((resolve, reject) => {
        new Compressor(file,{
            quality:judgeQuality(file.size),
            success(result) {
                resolve(result);
            },
            error(err){
                reject('Compressor ERR',err);
            }
        });
    })
}

//データを書き換える際の関数。
async function updateFunc(object, collection, imgUid, goalURL){
    await dataUpdate(object,collection, imgUid)
    location.href= goalURL;
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
        location.href=loseURL;
    }
}

//ファイルのサイズによって圧縮率を変更する。
function judgeQuality(fileSize){
    const M = 1024;
    if(fileSize<M*0.3){
        return 0.8;
    }else if(fileSize<M*0.5){
        return 0.6;
    }else if(fileSize<M*M){
        return 0.4;
    }else if(fileSize<2*M*M){
        return 0.2;
    }else{
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
        location.href = `/login`;
    }).catch( (error)=>{
        location.href = `/display/sorry?err_param=2&msg=${error}&uid=${uid}`;
    });
}

function getRankingList(imgData){
    let rank = 0;
    let con_num = 0;
    let befo_vote = 9999999;
    return Object.keys(imgData).map(key =>{ return imgData[key];}) // 配列に変更
    .filter(image => image.join_ranking) //ランキング参加するもののみに変更
    .sort((a, b)=>Number(b.vote) - Number(a.vote)) // 多い順に並べ替え
    .map( key => {
        if(key.vote == befo_vote){
            con_num++;
            key.rank = rank;
        }else{
            rank++;
            befo_vote = key.vote;
            key.rank = rank + con_num;
            con_num = 0;
        }
        return key;
    })
}

//その他の関数-------------------------------------------------------------------------------

//hostの関数-------------------------------------------------------------------------------

//ログイン時にuserIdがhostがどうか判別する。hostの場合hostURLに遷移。
async function checkHostLogin(uid){
    const hostData = await getStoreData('host','Host');
    if(hostData.id == uid ){
        location.href = hostData.url;
    }else{
        location.href='/login/account';
    }
}

//hostかどうか判別する。hostでない場合はログイン画面まで遷移する。
async function checkHost(uid){
    const hostData = await getStoreData('host','Host');
    if(hostData.id != uid ){
        location.href='/login';
    }else{
        return hostData;
    }
}

//host時における画像の取得と反映
function getAndReflectHostImg(imgUid, element) {
    const storageRef = storage.ref();
    storageRef.child("host/" + imgUid + ".jpg").getDownloadURL()
    .then(function(url) {
        //エレメントに画像を反映
        element.src = url;
        // const imgRatio = element.width / element.height;
        element.classList.add("side");
    }).catch((err) => {
        // Handle any errors
        location.href = `/display/sorry?err_param=3&msg=${err}`;
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
            location.href = `/display/sorry?err_param=2&msg=${error}&uid=${uid}`;
        }
    });
}

//host-check,サイトのアクセス制限の関数
async function displayAccess(){
    const hostData = await getStoreData('host','Host');
    const displaySwitch = hostData.switch.display;
    if(displaySwitch)location.href = '/display/sorry?err_param=1';
}

async function rankingAccess(){
    const hostData = await getStoreData('host','Host');
    const rankingSwitch = hostData.switch.ranking;
    if(rankingSwitch)location.href = '/display/sorry?err_param=1';
}

//hostの関数-------------------------------------------------------------------------------