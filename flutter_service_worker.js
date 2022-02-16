'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "4da2bd09bc0ca3a1f87227e3bb030e6d",
"assets/assets/fonts/RubikMonoOne-Regular.ttf": "f5486d33c22f837e905d600a5407da06",
"assets/assets/fonts/Sansita-Bold.ttf": "8f9e87b7a34489449aedf7ddb32354db",
"assets/assets/images/alarm.svg": "f0dd647651df9d890735646ec6cc1ed6",
"assets/assets/images/book.svg": "cb58edcbc51d6125ec1e6584af532898",
"assets/assets/images/chair.svg": "bb5684608dda0bbdee69f89aaf3d57b1",
"assets/assets/images/coin.svg": "b8d1c581dc5933a37772c0aea71020ba",
"assets/assets/images/eraser.svg": "6cc36fcc3b336a35c0d63174c965e4d9",
"assets/assets/images/front_face_book.svg": "7485dd52d16f92e4ccf684e380f37e96",
"assets/assets/images/game_over.svg": "484217874697f65ef5e722374053cb17",
"assets/assets/images/light.svg": "ddabd9899857735ae25e1a2eb23666ae",
"assets/assets/images/message.svg": "f0876dbfae4cfdc83085a0e31baa0ba0",
"assets/assets/images/pencil.svg": "29972a1bb2105b1065ded76c0ee45b2a",
"assets/assets/images/ruler.svg": "668ffdacd98ef289874d1898e0912844",
"assets/assets/images/splash_icon.png": "f2cb1c360644a164d08267f6b7235dbf",
"assets/assets/images/star.svg": "a4550be8af859f06627b96a710770840",
"assets/assets/images/table.svg": "aabd48aa716a2534ab957f7c4a622817",
"assets/assets/images/victory.svg": "fee03a9e316db1df36a4b49e13fb3aa1",
"assets/assets/sounds/background_music.mp3": "4e378506c25eea54ee59b3bc66e1ae34",
"assets/assets/sounds/clock_ticking.mp3": "b113d32b2db00ccc21336ddd2749b4fb",
"assets/assets/sounds/earn_coins.mp3": "6fd19f17235e930b7b434d7c6aa4962b",
"assets/assets/sounds/game_over.mp3": "471a1031cd59b560b7853df4635210c0",
"assets/assets/sounds/light_turn_off.mp3": "c0f60c771f33ed0a3aebe99956d1505d",
"assets/assets/sounds/light_turn_on.mp3": "875174e140217e65328cb8df62f4d0e5",
"assets/assets/sounds/victory.mp3": "5e9478bf2f503124338062ff13c904b1",
"assets/FontManifest.json": "1dc8c3d8a3dbe4dfeee93d905ec71642",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "e61289d6b3a5e7e498a51264349996f3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/sounds/background_music.mp3": "4e378506c25eea54ee59b3bc66e1ae34",
"canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"favicon.ico": "99a99daee2ac85f8f5e1f390652f2472",
"icons/icon-192.png": "6d17099d0d7ee8eb74507095f405485e",
"icons/icon-512.png": "6e6252c966907d228668002f5bce75d4",
"index.html": "82bc56dddf0b977a007dbb8c63028889",
"/": "82bc56dddf0b977a007dbb8c63028889",
"main.dart.js": "efa67df261f1b1e0a8b05e80139c5564",
"manifest.json": "d73aa1db4ab63694b3b6f0c687104dee",
"splash/img/dark-1x.png": "4437eb982a37ea734819eb79006f098a",
"splash/img/dark-2x.png": "415b21e6265f77ef7271924d6fb1dd0b",
"splash/img/dark-3x.png": "bd1bbda0bf072c71446cddcb68ce9f3a",
"splash/img/dark-4x.png": "850c87118ad7240c892036b7128b2f59",
"splash/img/light-1x.png": "4437eb982a37ea734819eb79006f098a",
"splash/img/light-2x.png": "415b21e6265f77ef7271924d6fb1dd0b",
"splash/img/light-3x.png": "bd1bbda0bf072c71446cddcb68ce9f3a",
"splash/img/light-4x.png": "850c87118ad7240c892036b7128b2f59",
"splash/splash.js": "c6a271349a0cd249bdb6d3c4d12f5dcf",
"splash/style.css": "d003663602d19c569f2fac907aad086c",
"version.json": "c3d81eb06fcb95d66737b5d40ca0bdd8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
