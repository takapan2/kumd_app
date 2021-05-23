async function thereUser(){
    try {
        await displayAccess();
        uid = await firebase.auth().currentUser.uid;
        const userData = await getStoreData('users',uid);
        const userValData = await validateUsersData(userData);
        await madePaintItems(userValData);
        await clickBtn();
        //await wait(2);//追加で2秒程待つ。
        $("body,html").animate({scrollTop: 0}, 1);//トップに移動
        loading.classList.add('loading-fadeaout');
    } catch (err){
        console.log(err);
    }
}
async function noUser(){
    location.href = "/login";
}

//テンプレートからイラストごとに要素を生成。(login固有の関数)
function madePaintItems(data) {
    const templeteContent = document.getElementById("templete-content");
    const itemsContent = document.querySelector("#account-menu-items-tem").content;
    const registerContent = document.querySelector("#new-register-tem").content;
    for (const property in data) {
        const clone = document.importNode(itemsContent, true);

        const image = clone.querySelector("img");
        const editBtn = clone.querySelector(".edit");
        const deleteBtn = clone.querySelector(".delete");
        const commentBtn = clone.querySelector(".comment");

        //ファイアーベースから画像を取得また要素に反映。
        getAndReflectUserImg(data[property],image);

        const getNum = data[property].split("-")[1];
        editBtn.value = getNum;
        deleteBtn.value = getNum;
        commentBtn.value = getNum;
        fragment.appendChild(clone);
    }
    const check = document.importNode(registerContent, true);
    fragment.appendChild(check);
    templeteContent.appendChild(fragment);
}
//ログアウトボタンや編集ボタンなどが押された際にどのような挙動をするかを決める。(login固有の関数)
function clickBtn() {
    const registerButton = document.getElementById("new-register");
    const logoutButton = document.getElementById("logout");
    const editButton = $(".edit");
    const deleteButton = $(".delete");
    const commentButton = $(".comment");

    editButton.on("click", function() {
        const editValue = $(this).attr("value");
        console.log("edit", editValue);
        location.href = `/login/account/edit?value=${editValue}`;
    });

    deleteButton.on("click", function() {
        const deleteValue = $(this).attr("value");
        console.log("delete", deleteValue);
        deleteFunc(deleteValue, uid, "/login/account/");
    });

    commentButton.on("click", function() {
        const commentValue = $(this).attr("value");
        console.log("comment", commentValue);
        location.href = `/login/account/comment?value=${commentValue}`;
    });

    registerButton.addEventListener("click", () => {
        location.href = `/login/account/new`;
    });

    logoutButton.addEventListener("click", () => {
        console.log("logout!");
        if (window.confirm("ログアウトしてもよろしいでしょうか？")) {
            logout();
        }
    });
}