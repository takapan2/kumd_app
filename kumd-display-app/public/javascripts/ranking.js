var imgData;
async function thereUser(){
    try{
        await rankingAccess();
        await displayAccess();
        imgData = await getStoreData('images','imgs');
        imgData = await SortRankingData(imgData);
        await displayWrite(imgData);
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

function SortRankingData(imgData){
    return Object.keys(imgData).map(key =>{ return imgData[key];})
    .sort((a, b)=>a.vote > b.size)
}

var i=1;
var before_data;
async function displayWrite(ImgsData){
    return await ImgsData.forEach((data) => {
        if(data.join_ranking)itemWrite(data);
    });
}

async function itemWrite(data){
    try{
        if(before_data && before_data!=data.vote)i++
        before_data = data.vote

        if(i<11){
            const itemsContent = document.querySelector('#ranking-tem').content;
            const templeteContent = document.getElementById(`ranking-container`);

            const clone = document.importNode(itemsContent, true);
            const image = clone.querySelector('img');

            const title = clone.querySelector('.title');
            const vote = clone.querySelector('.vote');
            const rank = clone.querySelector('.rank');
            const penname = clone.querySelector('.penname');

            const url = await getImg(data.id);
            await ReflectUserImg(url, image, 'on');

            fragment.appendChild(clone);
            templeteContent.appendChild(fragment);

            title.innerText = data.title;
            vote.innerText = `${data.vote}票`;
            rank.innerText = `第${i}位`;
            penname.innerText = data.penname;
        }
    }catch(err){
        console.log('err',err);
    }
}