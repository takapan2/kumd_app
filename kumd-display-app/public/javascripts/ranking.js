async function thereUser(){
    try{
        await rankingAccess();
        await displayAccess();
        const rankingData = await getRankingData();
        console.log(rankingData)
        await displayWrite(rankingData);
        await wait(3);
        $("body,html").animate({scrollTop: 100000}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    }catch(err){
        console.log("err",err);
    }
}
async function noUser(){
    thereUser();
}

var i=0;
async function displayWrite(ImgsData){
    return await ImgsData.forEach((doc) => {
        itemWrite(doc.data());
    });
}

async function itemWrite(data){
    try{
        const itemsContent = document.querySelector('#ranking-tem').content;
        const templeteContent = document.getElementById(`ranking-container`);

        const clone = document.importNode(itemsContent, true);
        const image = clone.querySelector('img');

        const title = clone.querySelector('.title');
        const vote = clone.querySelector('.vote');
        const rank = clone.querySelector('.rank');
        const penname = clone.querySelector('.penname');

        getAndReflectUserImg(data.id,image);

        fragment.appendChild(clone);
        templeteContent.appendChild(fragment);

        const imgData = await getStoreData('imgs',data.id);

        title.innerText = imgData.title;
        vote.innerText = `${data.vote}票`;
        rank.innerText = `第${++i}位`;
        penname.innerText = imgData.penname;
    }catch(err){
        console.log('err',err);
    }
}