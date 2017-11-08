var cachefile = [
    "/index.html",
    "/minipic/ann.jpg",
    "/minipic/den.jpg",
    "/minipic/jacky.jpg",
    "/minipic/santa.jpg",
    "/minipic/tony.jpg"
];

var cachekey = 'financefunny-v3';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cachekey).then(cache => {
            cache.addAll(cachefile);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(
            cacheKeyList => {
                const handler = cacheKeyList.map(item => {
                    if (item != cachekey)
                        return caches.delete(item);
                });

                return Promise.all(handler);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then( response => {
        if (response)
            return response;
        return fetch(event.request);
    }));
});