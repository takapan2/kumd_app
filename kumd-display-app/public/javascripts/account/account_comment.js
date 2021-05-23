async function thereUser(){
    try {
        await displayAccess();
        const queryObject = await getQueryObject();
        value = await getQueryValue( queryObject, 'value', '/login/account');
        uid = await firebase.auth().currentUser.uid;
        imgUid = `${uid}-${value}`;

        const imgData = await getStoreData('imgs',imgUid);
        await writeEditData(imgData);
        await getAndReflectUserImg(imgUid,imageElement);
        var crientsData = await getStoreData('crients',imgUid);
        var crientsValData = await validateCrientsData(crientsData);
        crientsData = await getDecSort(crientsValData);
        await reflectCrientData(crientsData);
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
    for (const property in data) {
        console.log(data[property]);
        const clone = document.importNode(itemsContent, true);

        const time = clone.querySelector("th");
        const comment = clone.querySelector("td");

        time.innerText = data[property].date;
        comment.innerText = data[property].comment;
        fragment.appendChild(clone);
    }
    templeteContent.appendChild(fragment);
}