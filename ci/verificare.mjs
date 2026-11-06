// Verificarea site-ului la fiecare încărcare pe GitHub: codul se poate citi, pagina se deschide fără erori,
// 404.html este identic cu index.html (necesar pentru adresele /frigider, /lista …).
import fs from "fs";
import vm from "vm";
let fail = 0; const ok = (c, m) => { console.log((c ? "✓ " : "✗ ") + m); if (!c) fail++; };
const html = fs.readFileSync("index.html", "utf8");
ok(html.length > 100000, "index.html există (" + Math.round(html.length / 1024) + " KB)");
const scripts = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(s => s.trim());
let syntax = true; scripts.forEach((s, i) => { try { new vm.Script(s, { filename: "script" + i }); } catch (e) { syntax = false; console.log("   eroare în scriptul " + i + ": " + e.message); } });
ok(syntax, "codul JavaScript se poate citi (" + scripts.length + " blocuri)");
ok(fs.existsSync("404.html") && fs.readFileSync("404.html", "utf8") === html, "404.html este identic cu index.html");
ok(fs.existsSync("sw.js"), "sw.js există");
if (process.env.BROWSER !== "0") {
  const { chromium } = await import("playwright");
  const br = await chromium.launch();
  for (const [name, vp] of [["calculator", { width: 1300, height: 900 }], ["telefon", { width: 390, height: 844 }]]) {
    const p = await br.newPage({ viewport: vp }); const errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.route(/^https?:\/\/(?!localhost)/, r => r.abort());          // fără internet: serverul și fonturile nu sunt necesare
    for (const path of ["/", "/retete", "/frigider", "/lista", "/confidentialitate"]) {
      await p.goto("http://localhost:8080" + path); await p.waitForTimeout(1200);
      const shown = await p.evaluate(() => document.querySelector("#app") && document.querySelector("#app").children.length > 0);
      const wide = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      ok(shown && !errs.length, `${name}: ${path} se deschide${errs.length ? " — " + errs[0] : ""}`);
      ok(!wide, `${name}: ${path} nu iese în lateral`);
      errs.length = 0;
    }
  }
  await br.close();
}
console.log(fail ? `\n${fail} verificări au eșuat` : "\nToate verificările au trecut");
process.exit(fail ? 1 : 0);
