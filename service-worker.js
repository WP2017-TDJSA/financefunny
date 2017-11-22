var cachefile = [
    "/",
    "/index.html",
    "/manifest.json",
    "/fonts/FontAwesome.otf",
    "/fonts/fontawesome-webfont.eot",
    "/fonts/fontawesome-webfont.svg",
    "/fonts/fontawesome-webfont.ttf",
    "/fonts/fontawesome-webfont.woff",
    "/fonts/glyphicons-halflings-regular.eot",
    "/fonts/glyphicons-halflings-regular.svg",
    "/fonts/glyphicons-halflings-regular.ttf",
    "/fonts/glyphicons-halflings-regular.woff",
    "/js/jquery-2.1.1.min.js",
    "/js/bootstrap.min.js",
    "/js/wow.min.js",
    "/js/jquery.easing.1.3.js",
    "/js/jquery.bxslider.min.js",
    "/js/jquery.isotope.min.js",
    "/js/fancybox/jquery.fancybox.pack.js",
    "/js/functions.js",
    "/favicon.ico",
    "/img/appicon.png",
    "/minipic/ann.png",
    "/minipic/den.png",
    "/minipic/jacky.png",
    "/minipic/santa.png",
    "/minipic/tony.png",
    "/minipic/who.png",
    "https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600",
    "https://fonts.gstatic.com/s/opensans/v15/DXI1ORHCpsQm3Vp6mXoaTegdm0LZdjqr5-oayXSOefg.woff2",
    "https://fonts.gstatic.com/s/opensans/v15/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2",
    "https://fonts.gstatic.com/s/opensans/v15/k3k702ZOKiLJc3WVjuplzOgdm0LZdjqr5-oayXSOefg.woff2",
    "/fonts/fontawesome-webfont.woff?v=4.0.3",
    "/css/animate.css",
    "/css/bootstrap.min.css",
    "/css/font-awesome.min.css",
    "/css/font-awesome.css",
    "/css/overwrite.css",
    "/css/jquery.bxslider.css",
    "/css/style.css"
];

var cachekey = 'financefunny-v10';
var cachekeyAll = [cachekey];
var needToCache = {};
var needToCache_tmp = {
    css : [
        "./css/animate.css",
        "./css/bootstrap.min.css",
        "./css/font-awesome.min.css",
        "./css/font-awesome.css",
        "./css/overwrite.css",
        "./css/jquery.bxslider.css",
        "./css/style.css"
    ],
    js : [
        "./js/jquery-2.1.1.min.js",
        "./js/bootstrap.min.js",
        "./js/wow.min.js",
        "./js/jquery.easing.1.3.js",
        "./js/jquery.bxslider.min.js",
        "./js/jquery.isotope.min.js",
        "./js/fancybox/jquery.fancybox.pack.js",
        "./js/functions.js",
        "./service-worker.js"
    ],
    fonts : [
        "./fonts/FontAwesome.otf",
        "./fonts/fontawesome-webfont.eot",
        "./fonts/fontawesome-webfont.svg",
        "./fonts/fontawesome-webfont.ttf",
        "./fonts/fontawesome-webfont.woff",
        "./fonts/glyphicons-halflings-regular.eot",
        "./fonts/glyphicons-halflings-regular.svg",
        "./fonts/glyphicons-halflings-regular.ttf",
        "./fonts/glyphicons-halflings-regular.woff",
        "https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600",
        "https://fonts.gstatic.com/s/opensans/v15/DXI1ORHCpsQm3Vp6mXoaTegdm0LZdjqr5-oayXSOefg.woff2",
        "https://fonts.gstatic.com/s/opensans/v15/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2",
        "https://fonts.gstatic.com/s/opensans/v15/k3k702ZOKiLJc3WVjuplzOgdm0LZdjqr5-oayXSOefg.woff2",
        "./fonts/fontawesome-webfont.woff?v=4.0.3"
    ],
    image : [    
        "./img/appicon.png",
        "./minipic/ann.png",
        "./minipic/den.png",
        "./minipic/jacky.png",
        "./minipic/santa.png",
        "./minipic/tony.png",
        "./minipic/who.png"
    ],
    main : [
        "./",
        "./index.html",
        "./manifest.json",
        "./favicon.ico"
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