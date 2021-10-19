var imgData
var meter_count
async function thereUser(){
    try{
        meter_count = 0
        await displayAccess();
        await getAndReflectHostImg('title', document.querySelector(`.title-img`));
        const hostData = await getStoreData('host','Host');
        const demoData = hostData.demo;
        for(var j=1;j<=3;j++){
            const imageElement = document.querySelector(`.demo-img${j}`);
            const titleElement = document.querySelector(`.title${j}`);
            const pennameElement = document.querySelector(`.penname${j}`);
            const captionElement = document.querySelector(`.caption${j}`);
            if(j!=3)await getAndReflectHostImg('demo',imageElement);
            titleElement.innerHTML = await demoData.title;
            pennameElement.innerHTML = await demoData.penname;
            captionElement.innerHTML = await demoData.caption;
        }
        imgData = await getStoreData('images','imgs');
        const sortImgData = await sortImgs(imgData)
        var allCookies = document.cookie;
        var cookieKey = allCookies.split('; ').map(x => x.split('=')[0])
        console.log(sortImgData)
        await displayWrite(sortImgData, cookieKey);
        textValidation('.paint-comment',100);
        textValidation('.contact-comment',200);
        await wait(2);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
        console.log("読み込み完了！");
        clickBtn();
    }catch(err){
        location.href = `/display/sorry?err_param=3&err=${err}`
    }
}
async function noUser(){
    thereUser();
}

function clickBtn(){
    const goodButton = $(".heart-check");
    const submitButton = $('.crient-submit');
    const image = $(".display-img-content");
    const image_pop_up = $(".expansion-img-wapper")

    let timers = {};
    goodButton.on("click", function() {
        const heartCheckId = $(this).attr("id").replace('heart-check', "");
        const heartChecked = $(this)[0].checked;

        if($(this)[0].className !== 'heart-check goodJudge'){
            $(this).addClass('goodJudge');
            timer = window.setTimeout(timeoutFunction, 7000, $(this), heartCheckId, heartChecked, timers);
            timers[heartCheckId] = timer;
            console.log('timer', timer)
        }else{
            $(this).removeClass('goodJudge');
            window.clearTimeout(timers[heartCheckId]);
            console.log('処理の取り消し',timers[heartCheckId]);
        }
    });

    submitButton.on("click", function() {
        if(window.confirm("提出は一回までとなっております。提出してもよろしいでしょうか")){
            const submitId = $(this).attr("id").split('_')[1];
            const commentValue = document.querySelector(`#textValue_${submitId}`).value;
            console.log('commentValue',commentValue)
            if(commentValue != '' || commentValue)submitComment(submitId, commentValue);
            // ボタンのセレクタとバリューを変更するような処理
            $(this).css('height','0px');
            $(this).css('padding','0px');
            $(this).css('pointer-events','none');
            $(`#textValue_${submitId}`).attr('readonly',true);
        }
    });

    image.on("click", function() {
        const imgId = $(this).attr("id").replace('img_', "");
        const imgExpantion = $(`#img_expantion_${imgId}`);
        const imgExpantionImage_2 = $(`#img_expantion_${imgId} > img`);
        const imgExpantionImage = document.querySelector(`#img_expantion_${imgId} > img`);
        imgExpantion.css('display', 'flex');
        const imgRatio = imgExpantionImage.naturalWidth / imgExpantionImage.naturalHeight
        const displayRatio = document.documentElement.clientWidth / (screen.availHeight)
        console.log(imgRatio+' '+displayRatio)
        if( imgRatio < displayRatio ) {
            imgExpantionImage_2.css('height',`90vh`).css('width', 'auto');
        }else {
            imgExpantionImage_2.css('width',`90vw`).css('height', 'auto');
        }
    });

    image_pop_up.on("click", function(){
        image_pop_up.css('display', 'none');
    });
}

async function submitComment(submitId, commentValue){
    try{
        if(submitId == 'bottom'){
            console.log(commentValue);
            var contactData = await getStoreData('contact','Contact');
            await contactData.contact.push(commentValue);
            await setStoreData(contactData,'contact','Contact');
        }else{
            imgData = await getStoreData('images','imgs');
            const imgUid = submitId
            var pushData = imgData[imgUid];
            var now = new Date();
            var date = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
            // pushData.commentNum = crientsData.commentNum + 1;
            pushData.comment.push({text: commentValue, date: date });
            console.log('submit pushData',pushData);
            await dataUpdate({[imgUid]:pushData}, 'images','imgs');
        }
    }catch(err){
        location.href = `/display/sorry?err_param=3&err=${err}`
    }
}

function timeoutFunction(thisElement, heartCheckId, heartChecked, timers){
    addVote(heartCheckId, heartChecked)
    console.log('表を変化済み', thisElement)
    thisElement.removeClass('goodJudge');
    delete timers[heartCheckId];
}

async function addVote(imgUid, checked){
    imgData = await getStoreData('images','imgs');
    var pushData = imgData[imgUid];
    if(checked){
        console.log('add!')
        pushData.vote = pushData.vote + 1;
        const date = 7*24*60*60; //7日まつ
        document.cookie = `heart-check${imgUid}=checked; max-age=${date}`
    }else{
        console.log('decrease!')
        pushData.vote = pushData.vote - 1;
        document.cookie = `heart-check${imgUid}=checked; max-age=0`
    }
    await dataUpdate({[imgUid]: pushData},'images','imgs');
}

async function displayWrite(ImgsData, Keys){
    for(var prop in ImgsData){
        let data = ImgsData[prop];
        const itemsContent = await document.querySelector('#display-item-tem').content
        const templeteContent = document.getElementById(`scroll-${data.grade}`);

        const clone = await document.importNode(itemsContent, true);

        const image = await clone.querySelector('.display-img');
        const image_content = await clone.querySelector('.display-img-content');
        const image_expansion = await clone.querySelector('.expansion-img');
        const image_expansion_wrapper = await clone.querySelector('.expansion-img-wapper');
        const acdCheck = await clone.querySelector('.acd-check');

        const title = await clone.querySelector('.title');
        const penname = await clone.querySelector('.penname');
        const caption = await clone.querySelector('.caption');

        const heartCheck = await clone.querySelector('.heart-check');
        const content = await clone.querySelector('.crient-content');
        const faHeart = await clone.querySelector('.far-heart');
        const faComment = await clone.querySelector('.fa-comment');
        const textArea = await clone.querySelector('textarea');
        const submitBtn = await clone.querySelector('.crient-submit');

        // const url = await getImg(data.id);
        // await ReflectDisplayUserImg(url, image, 'on');
        // await ReflectDisplayUserImg(url, image_expansion, '');
        acdCheck.id = `acd-check${data.id}`;

        await fragment.appendChild(clone);
        await templeteContent.appendChild(fragment);

        title.innerHTML = await data.title;
        penname.innerHTML = await data.penname;
        caption.innerHTML = await data.caption;

        image_content.id = `img_${data.id}`;
        // image_expansion.id = `img_expantion_${data.id}`;
        image_expansion_wrapper.id = `img_expantion_${data.id}`;
        heartCheck.id = `heart-check${data.id}`;
        textArea.id = `textValue_${data.id}`;
        submitBtn.id = `submit_${data.id}`
        content.name = await data.id;
        await faHeart.setAttribute("for",`heart-check${data.id}`);
        await faComment.setAttribute("for",`acd-check${data.id}`);
        if(Keys.includes(`heart-check${data.id}`)) heartCheck.checked = true
    }
}