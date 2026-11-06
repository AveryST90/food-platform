/* Try To Be FIT — lucru fără internet: păstrează site-ul pe telefon, ca lista de cumpărături și frigiderul să se deschidă și în magazin, cu semnal slab.
   Pagina: întâi rețeaua (cel mult 4 secunde), altfel copia salvată. Datele (lista, frigiderul) stau în browser și se trimit la server când revine internetul. */
const CACHE = "tbf-v4";
const CORE = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const timeout = (p, ms) => new Promise((ok, no) => { const t = setTimeout(() => no(new Error("timeout")), ms); p.then(v => { clearTimeout(t); ok(v); }, e => { clearTimeout(t); no(e); }); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  const fonts = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)$/.test(u.hostname);
  if (u.origin !== self.location.origin && !fonts) return;              // serverul API nu trece prin aici
  if (r.mode === "navigate") {                                          // pagina: rețeaua, altfel copia
    const app = u.pathname === "/" || u.pathname === "/index.html";      // paginile publice ale rețetelor nu înlocuiesc copia aplicației
    e.respondWith(timeout(fetch(r), 4000).then(res => { if (res.ok && app) { const cp = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); } return res; })
      .catch(() => caches.match("./index.html").then(m => m || caches.match("./")).then(m => m || Response.error())));
    return;
  }
  // restul (iconițe, fonturi, biblioteci): copia imediat, apoi actualizare în fundal
  e.respondWith(caches.match(r).then(m => {
    const net = fetch(r).then(res => { if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; }).catch(() => m);
    return m || net;
  }));
});

// notificări push: mesaje noi, invitații, noutățile din familie (trimise de server)
self.addEventListener("push", e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Try To Be FIT", { body: d.body || "", icon: "/icon-192.png", badge: "/icon-192.png", tag: d.tag, renotify: !!d.tag, data: { url: d.url || "/" } }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "/", self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    for (const c of l) if (c.url.startsWith(self.location.origin) && "focus" in c) { c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
