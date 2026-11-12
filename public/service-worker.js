
const CACHE_NAME = "fp-by-licenia-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch("/precache-manifest.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el manifiesto");
        }
        return response.json();
      })
      .then((archivos) => {
        return caches.open(CACHE_NAME)
          .then((cache) => cache.addAll(archivos));
      })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Solicitud:", event.request.url);

  event.respondWith(
    caches.match(event.request, {ignoreVary: true})
      .then((respuestaCache) => {
        console.log(
          "¿Encontrado en caché?",
          Boolean(respuestaCache),
          event.request.url
        );

        if (respuestaCache) {
          return respuestaCache;
        }

        return fetch(event.request);
      })
  );
});
