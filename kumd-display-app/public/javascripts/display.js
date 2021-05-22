async function thereUser(){
    try{
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
    try{
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

const submitButton = document.querySelector('.crient-submit');

submitButton.addEventListener("click",function(){
    if(window.confirm("提出は一回までとなっております。提出してもよろしいでしょうか")){
        loading.classList.remove('loading-fadeaout');
        crientSubmitFunc();
    }
});

async function crientSubmitFunc(){
    try{
        const crientContents = document.querySelectorAll('.crient-content');
        await getCrientContent(crientContents);
        console.log("提出完了！");
        location.href = '/display/submit';
    }catch(err){
        console.log('err',err);
    }
}

//画像のデータを全て取得する関数
function getAllImgsData(){
    const imgsRef = db.collection('imgs').orderBy("size").orderBy("grade");
    return imgsRef.get();
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

    //getAndReflectUserImg(data.id,image);
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

async function getCrientContent(crientContents){
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