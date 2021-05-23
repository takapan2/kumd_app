async function thereUser(){
    uid = await firebase.auth().currentUser.uid;
    const hostData = await checkHost(uid);
    $("body,html").animate({scrollTop: 0}, 1);//トップに移動
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    location.href = '/login';
}

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
    console.log("logout!");
    if (window.confirm("ログアウトしてもよろしいでしょうか？")) {
        logout();
    }
});
