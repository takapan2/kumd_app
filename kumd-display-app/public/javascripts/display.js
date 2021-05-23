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
        await displayWrite(allImgsData);
        textValidation('.paint-comment',100);
        textValidation('.contact-comment',200);
        await wait(2);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
        console.log("読み込み完了！");
    }catch(err){
        console.log(err);
    }
}
async function noUser(){
    thereUser();
}

const submitButton = $('.crient-submit');

submitButton.on("click",function(){
    if(window.confirm("提出は一回までとなっております。提出してもよろしいでしょうか")){
        loading.classList.remove('loading-fadeaout');
        crientSubmitFunc();
    }
});

async function crientSubmitFunc(){
    try{
        const crientContents = document.querySelectorAll('.crient-content');
        const contactValue = document.querySelector('.contact-comment').value;
        await getCrientContent(crientContents,contactValue);
        console.log("提出完了！");
        location.href = '/display/submit';
    }catch(err){
        console.log('err',err);
    }
}

async function displayWrite(ImgsData){
    return await ImgsData.forEach((doc) => {
        itemWrite(doc.data());
    });
}

function itemWrite(data){
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

    getAndReflectUserImg(data.id,image);
    acdCheck.id = `acd-check${data.id}`;

    fragment.appendChild(clone);
    templeteContent.appendChild(fragment);

    title.innerHTML = data.title;
    penname.innerHTML = data.penname;
    caption.innerHTML = data.caption;

    heartCheck.id = `heart-check${data.id}`;
    content.name = data.id;
    faHeart.setAttribute("for",`heart-check${data.id}`);
    faComment.setAttribute("for",`acd-check${data.id}`);
}

async function getCrientContent(crientContents,contactValue){
    if(contactValue!=""){
        console.log(contactValue);
        var contactData = await getStoreData('contact','Contact');
        await contactData.contact.push(contactValue);
        await setStoreData(contactData,'contact','Contact');
    }
    for(var i=0; i<crientContents.length; i++){
        const crientContent = crientContents[i];
        const voteValue = crientContent.querySelector('.heart-check').checked
        const textValue = crientContent.querySelector('textarea').value;
        if(voteValue||textValue!=""){
            const imgUid = crientContent.name;
            const crientsData = await getStoreData('crients',imgUid);
            var pushData ={};
            if(await voteValue)pushData.vote = crientsData.vote + 1;
            if(await textValue != ""){
                var now = new Date();
                var date = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
                pushData.commentNum = crientsData.commentNum + 1;
                pushData[`comment${pushData.commentNum}`] = {comment: textValue, date: date };
            }
            console.log('submit pushData',pushData);
            await dataUpdate(pushData,'crients',imgUid);
        }
    }
}