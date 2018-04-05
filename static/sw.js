const CACHE_NAME = 'metro_v1';
const cacheURL = [
    '/', 
    'https://fonts.googleapis.com/css?family=Roboto:300,400,700'
]

/*
Inside of our install callback, we need to take the following steps:
    Open a cache.
    Cache our files.
    Confirm whether all the required assets are cached or not.

*/
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log(`[service worker] Caching files`)
            return cache.addAll(cacheURL)
        })
    )
})

self.addEventListener('activate', function (event) {
    const cacheWhiteList = CACHE_NAME;

    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME ){
                        console.log(`remove cache from: ${cacheName}`)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if(response){
                console.log(`[service worker] found in cache ${event.request.url}`)
                return response
            }
            return fetch(event.request)
        })
    )
})