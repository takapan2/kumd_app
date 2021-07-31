async function thereUser(){
    try{
        await displayAccess();
        await getAndReflectHostImg('title', document.querySelector(`.title-img`));
        const hostData = await getStoreData('host','Host');
        const demoData = hostData.demo;
        for(var j=1;j<=3;j++){
            const imageElement = document.querySelector(`.demo-img${j}`);
            const titleElement = document.querySelector(`.title${j}`);
            const pennameElement = document.querySelector(`.penname${j}`);
            const captionElement = document.querySelector(`.caption${j}`);
            await getAndReflectHostImg('demo',imageElement);
            titleElement.innerHTML = await demoData.title;
            pennameElement.innerHTML = await demoData.penname;
            captionElement.innerHTML = await demoData.caption;
        }
        const allImgsData = await getAllImgsData();
        var allCookies = document.cookie;
        var cookieKey = allCookies.split('; ').map(x => x.split('=')[0])
        await displayWrite(allImgsData, cookieKey);
        textValidation('.paint-comment',100);
        textValidation('.contact-comment',200);
        await wait(2);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
        console.log("読み込み完了！");
        clickBtn();
    }catch(err){
        console.log(err);
    }
}
async function noUser(){
    thereUser();
}

function clickBtn(){
    const goodButton = $(".heart-check");
    const submitButton = $('.crient-submit');

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
}

async function submitComment(submitId, commentValue){
    try{
        if(submitId == 'bottom'){
            console.log(commentValue);
            var contactData = await getStoreData('contact','Contact');
            await contactData.contact.push(commentValue);
            await setStoreData(contactData,'contact','Contact');
        }else{
            const crientsData = await getStoreData('crients',submitId);
            var pushData ={};
            var now = new Date();
            var date = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
            pushData.commentNum = crientsData.commentNum + 1;
            pushData[`comment${pushData.commentNum}`] = {comment: commentValue, date: date };
            console.log('submit pushData',pushData);
            await dataUpdate(pushData,'crients',submitId);
        }
    }catch(err){
        console.log('err',err);
    }
}

function timeoutFunction(thisElement, heartCheckId, heartChecked, timers){
    addVote(heartCheckId, heartChecked)
    console.log('表を変化済み', thisElement)
    thisElement.removeClass('goodJudge');
    delete timers[heartCheckId];
}

async function addVote(imgUid, checked){
    const crientsData = await getStoreData('crients',imgUid);
    var pushData ={};
    if(checked){
        console.log('add!')
        pushData.vote = crientsData.vote + 1;
        const date = 24*60*60;
        document.cookie = `heart-check${imgUid}=checked; max-age=${date}`
    }else{
        console.log('decrease!')
        pushData.vote = crientsData.vote - 1;
        document.cookie = `heart-check${imgUid}=checked; max-age=0`
    }
    await dataUpdate(pushData,'crients',imgUid);
}

async function displayWrite(ImgsData, Keys){
    return await ImgsData.forEach((doc) => {
        itemWrite(doc.data(), Keys);
    });
}

function itemWrite(data, Keys){
    const itemsContent = document.querySelector('#display-item-tem').content
    if(data.grade==""||!data.grade)data.grade=5; //何かしらの不具合でgradeの値が入っていない場合、その他に振り割る。
    const templeteContent = document.getElementById(`scroll-${data.grade}`);

    const clone = document.importNode(itemsContent, true);

    const image = clone.querySelector('img');
    const acdCheck = clone.querySelector('.acd-check');

    const title = clone.querySelector('.title');
    const penname = clone.querySelector('.penname');
    const caption = clone.querySelector('.caption');

    const heartCheck = clone.querySelector('.heart-check');
    const content = clone.querySelector('.crient-content');
    const faHeart = clone.querySelector('.fa-heart');
    const faComment = clone.querySelector('.fa-comment');
    const textArea = clone.querySelector('textarea');
    const submitBtn = clone.querySelector('.crient-submit');

    // getAndReflectUserImg(data.id,image);
    acdCheck.id = `acd-check${data.id}`;

    fragment.appendChild(clone);
    templeteContent.appendChild(fragment);

    title.innerHTML = data.title;
    penname.innerHTML = data.penname;
    caption.innerHTML = data.caption;

    heartCheck.id = `heart-check${data.id}`;
    textArea.id = `textValue_${data.id}`;
    submitBtn.id = `submit_${data.id}`
    content.name = data.id;
    faHeart.setAttribute("for",`heart-check${data.id}`);
    faComment.setAttribute("for",`acd-check${data.id}`);
    if(Keys.includes(`heart-check${data.id}`)) heartCheck.checked = true
}