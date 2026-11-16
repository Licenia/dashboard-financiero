
const CACHE_NAME = "fp-by-licenia-v2";

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

self.addEventListener("activate", (event) => {
  event.waitUntil(
  caches.keys().then((nombres) => {
    const cachesAntiguas = nombres.filter((elemento) => {
      return elemento.startsWith("fp-by-licenia-") && elemento !== CACHE_NAME
    })

    return Promise.all(
      cachesAntiguas.map((nombre) => {
       return caches.delete(nombre)

    })
    )
  })
  )
})

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
