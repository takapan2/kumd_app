var imgData;
async function thereUser(){
    try{
        await rankingAccess();
        await displayAccess();
        imgData = await getStoreData('images','imgs');
        imgData = getRankingList(imgData);
        await displayWrite(imgData);
        await wait(3);
        $("body,html").animate({scrollTop: 100000}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    }catch(err){
        location.href = `/display/sorry?err_param=3&err=${err}`
    }
}
async function noUser(){
    thereUser();
}

function SortRankingData(imgData){
    return Object.keys(imgData).map(key =>{ return imgData[key];})
    .sort((a, b)=>Number(b.vote) - Number(a.vote))
}

var i=1;
var before_data;
async function displayWrite(ImgsData){
    for(var prop in ImgsData){
        if(ImgsData[prop].rank<11){
            let data = ImgsData[prop];
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
            rank.innerText = `第${data.rank}位`;
            penname.innerText = data.penname;
        }
    }
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
            await ReflectUserImg(url, image, '');

            fragment.appendChild(clone);
            templeteContent.appendChild(fragment);

            title.innerText = data.title;
            vote.innerText = `${data.vote}票`;
            rank.innerText = `第${i}位`;
            penname.innerText = data.penname;
        }
    }catch(err){
        location.href = `/display/sorry?err_param=3&err=${err}`
    }
}