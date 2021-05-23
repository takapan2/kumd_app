async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    const allImgsData = await getAllImgsData();
    await displayWrite(allImgsData);
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
    return await ImgsData.forEach((doc) => {
        itemWrite(doc.data());
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

        getAndReflectUserImg(data.id,image);

        fragment.appendChild(clone);
        templeteContent.appendChild(fragment);

        const crientData = await getStoreData('crients',data.id);

        console.log(crientData);

        title.innerText = data.title;
        vote.innerText = crientData.vote;
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
    for(var i=0; i<crientContents.length; i++){
        const voteContent = crientContents[i];
        const voteValue = voteContent.querySelector('.vote-value').value;
        console.log(voteValue);
        if(voteValue!=""||voteValue!="0"){
            const imgUid = voteContent.name;
            const crientsData = await getStoreData('crients',imgUid);
            var pushData ={};
            pushData.vote = crientsData.vote + parseInt(voteValue);
            console.log('submit pushData',pushData);
            await dataUpdate(pushData,'crients',imgUid);
        }
    }
}