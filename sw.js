const CACHE_NAME = 'astro-v5';

self.addEventListener('install', (event) => {
    // 强制跳过等待，让新版本立即生效
    self.skipWaiting();
    console.log('SW installed');
});

self.addEventListener('activate', (event) => {
    // 清理旧缓存，防止手机加载旧的白屏页面
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => caches.delete(key))
        ))
    );
});

self.addEventListener('fetch', (event) => {
    // 手机端优先请求网络，失败了再找缓存，确保内容能出来
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});