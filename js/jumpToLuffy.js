
console.log('this is domain : '+document.domain);

if (document.domain != 'luffy.ee.ncku.edu.tw') {
    var newUrl = 'https://luffy.ee.ncku.edu.tw/~csielee'+document.location.pathname;
    console.log('we will goto ' + newUrl);
    window.location.replace(newUrl);
}