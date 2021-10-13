async function thereUser(){
    try {
        await displayAccess();
        const queryObject = await getQueryObject();
        value = await getQueryValue( queryObject, 'value', '/login/account');
        uid = await firebase.auth().currentUser.uid;
        imgUid = `${uid}-${value}`;

        const imgData = await getStoreData('images','imgs');
        await writeEditData(imgData[imgUid]);
        const url = await getImg(imgUid);
        await ReflectUserImg(url, imageElement, 'on');
        await reflectCrientData(imgData[imgUid].comment);
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    } catch (err){
        console.log(err);
    }
}
async function noUser(){
    location.href = "/login";
}

const titleElement = document.getElementById('title');
const imageElement = document.querySelector('img');


function writeEditData(imgData){
    titleElement.innerText = imgData.title;
}

function validateCrientsData(crientsData){
    console.log("関数内",crientsData);
    delete crientsData.id;
    delete crientsData.vote;
    delete crientsData.commentNum;
    return crientsData;
}

function reflectCrientData(data){
    const templeteContent = document.getElementById("comment-content");
    const itemsContent = document.querySelector("#comment-tem").content;
    data.map((cmt) => {
        const clone = document.importNode(itemsContent, true);
        const time = clone.querySelector("th");
        const comment = clone.querySelector("td");

        time.innerText = cmt.date;
        comment.innerText = cmt.text;
        fragment.appendChild(clone);
    })
    templeteContent.appendChild(fragment);
}