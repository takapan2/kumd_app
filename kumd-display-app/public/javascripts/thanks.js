async function thereUser(){
    const queryObject = await getQueryObject();
    const value = await getQueryValue( queryObject, 'err_param', '/display/sorry?err_param=3');
    document.querySelector('h3').innerText = await !ERROR[value] ? ERROR[3].h3 : ERROR[value].h3;
    document.querySelector('.errormessage').innerText = await !ERROR[value] ? ERROR[3].p : ERROR[value].p;
    loading.classList.add('loading-fadeaout');
}
async function noUser(){
    thereUser();
}
