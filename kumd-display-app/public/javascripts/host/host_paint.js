var imgData
async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    imgData = await getStoreData('images','imgs');
    const sortImgData = await sortImgs(imgData)
    await displayWrite(sortImgData);
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    location.href = '/login';
}

const submitButton = document.querySelector('#submit-btn');

submitButton.addEventListener("click",function(){
    if(window.confirm("追加票を反映してもよろしいでしょうか？")){
        loading.classList.remove('loading-fadeaout');
        crientSubmitFunc();
    }
});

async function displayWrite(ImgsData){
    return await ImgsData.forEach((data) => {
        itemWrite(data);
    });
}

function itemWrite(data){

    (async()=>{
        const itemsContent = document.querySelector('#vote-tem').content;
        const templeteContent = document.getElementById(`vote-content`);

        const clone = document.importNode(itemsContent, true);
        const image = clone.querySelector('img');

        const title = clone.querySelector('.title');
        const vote = clone.querySelector('.vote');
        const voteContainer = clone.querySelector('.vote-container');

        const url = await getImg(data.id);
        await ReflectUserImg(url, image, 'on');

        fragment.appendChild(clone);
        templeteContent.appendChild(fragment);

        title.innerText = data.title;
        vote.innerText = data.vote;
        voteContainer.name = data.id;
    })();
}

async function crientSubmitFunc(){
    try{
        const crientContents = document.querySelectorAll('.vote-container');
        await getVoteContent(crientContents);
        console.log("提出完了！");
        location.href = '/login/host';
    }catch(err){
        console.log('err',err);
    }
}

async function getVoteContent(crientContents){
    imgData = await getStoreData('images','imgs');
    crientContents.forEach((crientcontent)=>{
        const voteValue = crientcontent.querySelector('.vote-value').value;
        const imgUid = crientcontent.name;
        imgData[imgUid].vote = imgData[imgUid].vote + parseInt(voteValue);
    })
    await dataUpdate(imgData,'images','imgs');
}