const CACHE_NAME = 'astro-v5-final'; // 注意：这里改成了 v2，可以强制刷新缓存
const assets = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// 核心：当有新版本时立刻激活，删掉旧缓存
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )));
});



