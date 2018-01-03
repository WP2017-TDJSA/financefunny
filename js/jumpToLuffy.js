
console.log('this is domain : '+document.domain);

if (window.location.search == '' && window.location.origin != 'file://' && document.domain != 'luffy.ee.ncku.edu.tw' && document.domain != 'localhost' && document.domain != '127.0.0.1') {
    var newUrl = 'https://luffy.ee.ncku.edu.tw/~csielee'+document.location.pathname;
    console.log('we will goto ' + newUrl);
    window.location.replace(newUrl);
}