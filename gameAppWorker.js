var cachekey = 'financefunny-game';
var cachekeyAll = [];
//var needToCache = {};
var needToCache = {
    css : [
    ],
    js : [
        "app.js",
        "vendor.js",
        "gameAppWorker.js"
    ],
    fonts : [

    ],
    image : [
        "./img/favicon.ico"
    ],
    phaser : [
        //'img/game/*.*',
        'img/game/background.jpg',
        'img/game/black.png',
        'img/game/start.gif',
        'img/game/playerwalk.png',
        'img/game/playerwalk.json',
        'img/game/stupidwalk.png',
        'img/game/stupidwalk.json',
        'img/game/richwalk.png',
        'img/game/richwalk.json',
        'img/game/sanhuwalk.png',
        'img/game/sanhuwalk.json',
        'img/game/bc.png',
        'img/game/bc.json',
        'music/Ambler.mp3',
        'music/button_click.mp3',
        'img/game/financefunny.png',
        "img/dummies/ann.jpg"
    ],
    main : [
        "./gameApp.html",
        "./gameApp/manifest.json"
    ]
};

self.addEventListener('install', event => {
    console.log('[sw] install...');
    /*event.waitUntil(
        caches.open(cachekey).then(cache => {
            cache.addAll(cachefile);
            console.log('[sw] add all cachefile\n' + cachefile);
        })
    );*/
    event.waitUntil(
        Object.keys(needToCache).forEach(element => {
            var str = cachekey + "-" + element;
            cachekeyAll.push(str);
            caches.open(str).then(cache => {
                cache.addAll(needToCache[element]);
                console.log('[sw] '+ str+ ' add '+ element + ' cache file : \n' + needToCache[element]);
            });    
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[sw] activate...');
    event.waitUntil(
        caches.keys().then(
            cacheKeyList => {
                const handler = cacheKeyList.map(item => {
                    if (cachekeyAll.indexOf(item) == -1) {
                        console.log('[sw] delete cache : '+item);
                        return caches.delete(item);
                    }
                });

                return Promise.all(handler);
            })
    );
});

self.addEventListener('fetch', event => {
    console.log('[sw] fetch... with '+event.request.url);
    event.respondWith(caches.match(event.request).then( response => {
        if (response) {
            console.log('[sw] find response in cache : '+event.request.url);
            return response;
        }
        console.log('[sw] not find ' + event.request.url + ', need to fetch from network');
        return fetch(event.request);
    }));
});