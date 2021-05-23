async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    const contactData = await getStoreData('contact','Contact');
    await contactWrite(contactData);
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    location.href = '/login';
}

async function contactWrite(contactDatas){
    return await contactDatas.contact.forEach((doc) => {
        contactItemWrite(doc);
    });
}

async function contactItemWrite(data){
        const itemsContent = document.querySelector('#comment-tem').content;
        const templeteContent = document.getElementById(`comment-content`);

        const clone = document.importNode(itemsContent, true);

        const comment = clone.querySelector('td');

        fragment.appendChild(clone);
        templeteContent.appendChild(fragment);

        comment.innerText = data;
}