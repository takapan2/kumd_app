var imgData;
var rankingData;
var img_order
async function thereUser(){
    try {
        uid = await firebase.auth().currentUser.uid;
        imgData = await getStoreData('images','imgs');
        rankingData = await getRankingList(imgData)
        const userData = await getStoreData('users',uid);
        const userValData = await validateUsersData(userData);
        await madePaintItems(userValData);
        await clickBtn();
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    } catch (err){
        location.href = `/display/sorry?err_param=2&err=${err}&uid=${uid}`;
    }
}
async function noUser(){
    location.href = "/login";
}

//テンプレートからイラストごとに要素を生成。(login固有の関数)
async function madePaintItems(data) {
    const templeteContent = document.getElementById("templete-content");
    const itemsContent = await document.querySelector("#account-menu-register-tem").content;
    const commentContent = await document.querySelector("#comment-tem").content;
    const registerContent = await document.querySelector("#new-register-tem").content;
    for (const property in data) {
        const imageValue = property.replace('img','');
        const imageProp = `${uid}-${imageValue}`
        const clone = document.importNode(itemsContent, true);

        const paintTitle = clone.querySelector('.paint-title');
        // 編集エレメント
        const accordionBtn = clone.querySelector('.accordion-btn');
        const accordionCheck = clone.querySelector('.accordion');
        const tagCheck = clone.querySelector('.tag');
        const editTag = clone.querySelector('.edit-tag');
        const commentTag = clone.querySelector('.comment-tag');
        const image = clone.querySelector(".account-img-content > img");
        const gradeSelect = clone.querySelector('select[name="grade"]');
        const sizeSelect = clone.querySelector('select[name="size"]');
        const title = clone.querySelector('input[name="title"]');
        const penname = clone.querySelector('input[name="penname"]');
        const caption = clone.querySelector('textarea[name="caption"]');
        const ranking = clone.querySelector('.join-ranking > input[type="checkbox"]');
        const rankingCheck = clone.querySelector('.join-ranking > label');
        const submitBtn = clone.querySelector('.submit-btn');
        const deleteBtn = clone.querySelector('.delete-btn');
        //エラーエレメント
        const gradeError = clone.querySelector('.grade-err');
        const sizeError = clone.querySelector('.size-err');
        const titleError = clone.querySelector('.title-err');
        const pennameError = clone.querySelector('.penname-err');
        const captionError = clone.querySelector('.caption-err');
        // comment部分
        const commentImage = clone.querySelector('.account-comment-img-content > img');
        const rankingVote = clone.querySelector('.ranking-vote');
        const rankingNumber = clone.querySelector('.ranking-number');
        // commentのテンプレート
        const commentTempleteContent = clone.querySelector(".comment-contents");
        const newFragment = document.createDocumentFragment();
        for(var object of imgData[imageProp].comment) {
            const commentClone = await document.importNode(commentContent, true);
            const {date, text} = object;
            commentClone.querySelector('.time').innerText = date;
            commentClone.querySelector('.crient-comment').innerText = text;
            newFragment.appendChild(commentClone);
        }
        commentTempleteContent.appendChild(newFragment);


        // ファイアーベースから画像を取得また要素に反映。
        const url = await getImg(data[property]);
        await ReflectUserImg(url, commentImage, '');
        await ReflectUserImg(url, image, '');

        paintTitle.innerText = imgData[imageProp].title

        accordionBtn.setAttribute("for",`accordion_${imageValue}`);
        accordionCheck.id = `accordion_${imageValue}`;
        tagCheck.id = `tag_${imageValue}`;
        editTag.setAttribute("for",`tag_${imageValue}`);
        commentTag.setAttribute("for",`tag_${imageValue}`);
        gradeSelect.id = `grade-select_${imageValue}`;
        sizeSelect.id = `size-select_${imageValue}`;
        title.id = `title_${imageValue}`;
        penname.id = `penname_${imageValue}`;
        caption.id = `caption_${imageValue}`;
        ranking.id = `join-ranking_${imageValue}`
        rankingCheck.setAttribute("for",`join-ranking_${imageValue}`);
        gradeError.id = `grade-err_${imageValue}`;
        sizeError.id = `size-err_${imageValue}`
        titleError.id = `title-err_${imageValue}`
        pennameError.id = `penname-err_${imageValue}`
        captionError.id = `caption-err_${imageValue}`
        submitBtn.value = imageValue;
        deleteBtn.value = imageValue;

        gradeSelect.value = imgData[imageProp].grade;
        sizeSelect.value = imgData[imageProp].size;
        title.value = imgData[imageProp].title;
        penname.value = imgData[imageProp].penname;
        caption.value = imgData[imageProp].caption;
        ranking.checked = imgData[imageProp].join_ranking

        rankingVote.innerText = `${imgData[imageProp].join_ranking ? `${imgData[imageProp].vote }` : '×'}票`
        rankingNumber.innerText = `第${imgData[imageProp].join_ranking ? await rankingData.find((imageElm) => imageElm.id == imageProp).rank : '×' }位`



        fragment.appendChild(clone);
    }
    const check = document.importNode(registerContent, true); //新規登録を最後に追加している。
    fragment.appendChild(check);
    templeteContent.appendChild(fragment);
}
//ログアウトボタンや編集ボタンなどが押された際にどのような挙動をするかを決める。(login固有の関数)
function clickBtn() {
    const submitButton = $(".submit-btn");
    const deleteButton = $(".delete-btn");
    const logoutButton = document.getElementById('logout');
    const fileContent = document.getElementById('file');
    const fileComment = document.querySelector('.file-comment');

    deleteButton.on("click", function() {
        const deleteValue = $(this).attr("value");
        imgUid = `${uid}-${deleteValue}`
        deleteFunc( uid, imgUid, "/login/account/");
    });

    submitButton.on("click", function() {
        const submitValue = $(this).attr("value");
        if(window.confirm(submitValue == "new" ? 'イラスト情報を保存し、展示会サイトに公開してもよろしいでしょうか？' : '変更を保存し、展示会サイト上で公開してもよろしいでしょうか？')){
            submitFunc(submitValue);
        }
    });

    logoutButton.addEventListener("click", () => {
        if (window.confirm("ログアウトしてもよろしいでしょうか？")) {
            logout();
        }
    });

    fileContent.addEventListener('change',function(e){
        file = e.target.files[0];
        fileComment.innerText = file.name;
    });
}

async function submitFunc(value) {
    try {
        loading.classList.remove('loading-fadeaout');

        imgUid = `${uid}-${value}`
        const newJudge = await value == "new";

        const gradeElement = document.getElementById(`grade-select${newJudge ? '': `_${value}`}`);
        const sizeElement = document.getElementById(`size-select${newJudge ? '': `_${value}`}`);
        const pennameElement = document.getElementById(`penname${newJudge ? '': `_${value}`}`);
        const titleElement = document.getElementById(`title${newJudge ? '': `_${value}`}`);
        const captionElement = document.getElementById(`caption${newJudge ? '': `_${value}`}`);
        const JoinRankingElement = document.getElementById(`join-ranking${newJudge ? '': `_${value}`}`);

        const fileErrMsg = document.querySelector(`#file-err${newJudge ? '': `_${value}`}`);
        const gradeErrMsg = document.querySelector(`#grade-err${newJudge ? '': `_${value}`}`);
        const sizeErrMsg = document.querySelector(`#size-err${newJudge ? '': `_${value}`}`);
        const pennameErrMsg = document.querySelector(`#penname-err${newJudge ? '': `_${value}`}`);
        const titleErrMsg = document.querySelector(`#title-err${newJudge ? '': `_${value}`}`);
        const captionErrMsg = document.querySelector(`#caption-err${newJudge ? '': `_${value}`}`);

        // エラーメッセージを一度非表示
        if(newJudge) fileErrMsg.innerText = "";
        gradeErrMsg.innerText = "";
        sizeErrMsg.innerText = "";
        pennameErrMsg.innerText = "";
        titleErrMsg.innerText = "";
        captionErrMsg.innerText = "";

        const gradeValue =  await gradeElement.value;
        const sizeValue = await sizeElement.value;
        const pennameValue = await pennameElement.value;
        const titleValue = await titleElement.value;
        const captionValue = await captionElement.value;
        const JoinRankingValue = await JoinRankingElement.checked;

        // validation
        let judge = 0;
        if(newJudge){
            if(!file){ fileErrMsg.innerText = VALIDATION.FILE.VAL; judge++; }
            else if(file.size>5*1024*1024){ fileErrMsg.innerText = VALIDATION.FILE.SIZE; judge++; };
        }
        if(!gradeValue){ gradeErrMsg.innerText = VALIDATION.GRADE; judge++; };
        if(!sizeValue){ sizeErrMsg.innerText = VALIDATION.SIZE; judge++; };
        if(!pennameValue){ pennameErrMsg.innerText = VALIDATION.PENNAME; judge++; };
        if(!titleValue){ titleErrMsg.innerText = VALIDATION.TITLE; judge++; }
        if(!captionValue){ captionErrMsg.innerText = VALIDATION.CAPTION; judge++; }
        if(judge!=0){ loading.classList.add('loading-fadeaout'); throw Error("Validation!!"); }

        if(newJudge){
            const result = await fileCompress(file);
            const userData = await getStoreData('users',uid);
            const imageOrderObj = await getStoreData('images', 'img_order')
            img_order = imageOrderObj.img_order + 1 ;
            imgNum = userData.imgNum + 1;
            imgUid = `${uid}-${imgNum}`;
            imgChild = `imgs/${imgUid}.jpg`;
            await saveStorageData(result,imgChild);
            const UserObject = {
                imgNum: imgNum,
                [`img${imgNum}`]:imgUid,
            };
            await dataUpdate(UserObject,'users',uid);
            await dataUpdate({ img_order: img_order }, 'images', 'img_order');
        }else{
            imgData = await getStoreData('images','imgs');
        }
        const imgObject = {
            [imgUid]:{
                id: imgUid,
                grade: gradeValue,
                size: sizeValue,
                penname: pennameValue,
                title: titleValue,
                caption: captionValue,
                join_ranking: JoinRankingValue,
                commentNum: newJudge ? 0 : imgData[imgUid].commentNum,
                comment: newJudge ? [] : imgData[imgUid].comment,
                vote: newJudge ? 0 : imgData[imgUid].vote,
                img_order: newJudge ? img_order : imgData[imgUid].img_order,
            }
        };
        updateFunc(imgObject,'images','imgs','/login/account');
        await wait(2); //5MB近いファイルだと何故か反映されないことがあるため。
        location.href = "/login/account";
    } catch (err) {
        console.log(err.message)
        if(err.message != 'Validation!!')location.href = `/display/sorry?err_param=2&err=${err}&uid=${uid}&imgUid=${imgUid}`;
    }
}