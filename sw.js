const CACHE_NAME = 'gas-pwa-v2';


/* =================================
   INSTALL SERVICE WORKER
================================= */

self.addEventListener('install', function (event) {

  /*
   * Langsung aktifkan versi baru
   * tanpa menunggu tab lama ditutup.
   */
  self.skipWaiting();

});


/* =================================
   AKTIVASI SERVICE WORKER
================================= */

self.addEventListener('activate', function (event) {

  event.waitUntil(

    (async function () {

      /*
       * Hapus cache versi lama
       * agar perubahan terbaru tidak tertahan.
       */

      const cacheNames =
        await caches.keys();

      await Promise.all(

        cacheNames
          .filter(function (cacheName) {

            return cacheName !== CACHE_NAME;

          })
          .map(function (cacheName) {

            return caches.delete(cacheName);

          })

      );

      /*
       * Ambil alih semua halaman yang sedang aktif.
       */
      await self.clients.claim();

    })()

  );

});


/* =================================
   FETCH
================================= */

self.addEventListener('fetch', function (event) {

  /*
   * Selalu ambil data terbaru dari internet.
   *
   * Tidak menggunakan cache untuk halaman
   * maupun iframe Google Apps Script.
   *
   * Ini membantu tombol refresh benar-benar
   * mendapatkan isi aplikasi terbaru.
   */

  event.respondWith(

    fetch(event.request, {
      cache: 'no-store'
    })

  );

});
