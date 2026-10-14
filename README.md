# Gusto

Prototip de platformă pentru rețete: cauți rețete după ingredientele pe care le ai, îți ții evidența frigiderului, faci liste de cumpărături și îți planifici mesele pe săptămână.

Este un site static (HTML, CSS și JavaScript într-un singur fișier). Nu are nevoie de server sau de instalare. Datele (frigider, liste, favorite, plan) se salvează în browserul fiecărui vizitator.

## Publicare pe GitHub Pages, din browser (fără programe instalate)

1. Intră pe https://github.com și autentifică-te (sau creează un cont gratuit).
2. Apasă **+** (dreapta sus) → **New repository**.
3. La **Repository name** scrie `gusto`, alege **Public** și apasă **Create repository**.
4. Pe pagina noului repository apasă linkul **uploading an existing file**.
5. Dezarhivează `gusto-github.zip` pe calculator. Deschide folderul și trage în fereastra GitHub **tot conținutul lui**: `index.html`, `README.md`, `.nojekyll` și folderele `img` și `photo`.
   - Încarcă fișierele din interiorul folderului, nu folderul `gusto-github` în sine, ca `index.html` să ajungă direct în rădăcină.
   - `.nojekyll` e un fișier ascuns. Dacă nu îl vezi, nu e grav: site-ul merge și fără el.
6. Jos, apasă **Commit changes**.
7. Mergi la **Settings** → **Pages** (în meniul din stânga).
8. La **Source** alege **Deploy from a branch**. La **Branch** alege `main` și folderul `/ (root)`, apoi **Save**.
9. Așteaptă 1–2 minute și reîncarcă pagina. Sus apare adresa site-ului, de forma:
   `https://NUMELE-TAU.github.io/gusto/`

## Publicare din linia de comandă (dacă folosești Git)

```bash
cd gusto-github
git init
git add .
git commit -m "Prima versiune Gusto"
git branch -M main
git remote add origin https://github.com/NUMELE-TAU/gusto.git
git push -u origin main
```

Apoi activează GitHub Pages ca la pașii 7–9 de mai sus.

## Actualizări

Ca să schimbi ceva, editezi `index.html` (direct pe GitHub: deschizi fișierul → creionul **Edit** → **Commit changes**) sau încarci din nou fișierul. Site-ul se actualizează singur în 1–2 minute.

## Structura

```
index.html   pagina completă: stiluri, date (rețete, produse) și logică
img/         ilustrații 3D pentru produse și rețete
photo/       fotografii ale preparatelor
.nojekyll    spune GitHub Pages să servească fișierele exact cum sunt
```

Rețetele și produsele sunt la începutul scriptului din `index.html`, în listele `R` (rețete) și `PROD` (produse).

## Limitele prototipului

- Nu există conturi reale. Rolul (Gratuit, Premium, Moderator, Administrator) se schimbă din meniul avatarului, doar pentru demonstrație.
- Plata Premium nu e reală. Butonul doar activează Premium în browser.
- Ce adaugă un administrator (rețete, poze, prețuri) se vede doar în browserul lui, nu la ceilalți vizitatori.

Pentru conturi, plăți Stripe și o bază de date comună e nevoie de versiunea Next.js + PostgreSQL descrisă în caietul de sarcini. GitHub Pages găzduiește doar site-uri statice, deci acea versiune se publică pe Vercel.

## Credite

- Ilustrațiile 3D din `img/` provin din [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) de Microsoft, licență MIT.
- Fonturile: Plus Jakarta Sans, prin Google Fonts.
