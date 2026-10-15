# Gusto — rețete, frigider, cumpărături și planificator

Prototip funcțional al platformei web de rețete, planificare și gestiune a cumpărăturilor, cu designul **Gusto** (verde salvie, crem și miere).

**Site live:** https://averyst90.github.io/food-platform/

> Totul rulează în browser, dintr-un singur fișier `index.html`, fără server. Datele se salvează în `localStorage`, deci rămân doar pe dispozitivul celui care folosește site-ul. Vezi secțiunea **Limitele prototipului**.

## Conturi demonstrative

Parola pentru toate conturile: `Gusto2026!`

| Rol | Email |
|---|---|
| Membru (plan gratuit) | membru@gusto.md |
| Membru cu Premium activ (are și familie) | premium@gusto.md |
| Antrenor personal | antrenor@gusto.md |
| Moderator | moderator@gusto.md |
| Administrator | admin@gusto.md |
| Administrator principal | super@gusto.md |

Banda **DEMO** din partea de sus a paginii permite trecerea rapidă între roluri. O poți închide cu **X**.

## Ce poți face în site

**Vizitator (fără cont)**
- Caută rețete după ingredientele pe care le ai, filtrează pe categorii și sortează.
- Vede pagina principală, rețetele (fără valori nutriționale) și planurile Premium.
- Își poate crea cont cu email și parolă.

**Membru (gratuit)**
- Rețete favorite, „Frigiderul meu” (150 de produse cu imagine, cantități, date de expirare, alerte pentru produse care expiră curând), liste de cumpărături și planificator manual de mese.
- Sugestii de rețete în funcție de ce ai în frigider.
- Limită de rețete deschise pe lună (implicit 5, reglabilă din Administrare → Monetizare). Valorile nutriționale nu se afișează deloc în planul gratuit.
- Rezumat anti-risipă pe ultimele 4 săptămâni.

**Membru Premium**
- Rețete nelimitate, calorii și macronutrienți la fiecare rețetă, planificator automat de mese, rapoarte anti-risipă pe 4, 8 și 12 săptămâni.
- Accesul durează cât perioada planului (lunar: 30 de zile, anual: 365 de zile). La expirare, accesul Premium se retrage automat.

**Familie (Premium sau activată de administrator)**
- Membrii își trimit invitații după emailul contului și formează o familie (cel mult 6 persoane).
- Fiecare alege dacă folosește frigiderul comun al familiei sau pe al lui; poate schimba oricând.
- Din „Contul meu” funcția de familie se poate dezactiva: ieși din familie și revii la frigiderul personal.
- Un administrator poate activa familia pentru orice membru, fără să-i dea Premium (butonul „Activează familia” din Utilizatori).

**Antrenor personal**
- Rol nou, atribuit de un administrator. Antrenorul are „Cabinet antrenor”: grupul de studenți (adăugare și eliminare după email), meniuri dedicate și calendar.
- Meniurile sunt confidențiale (le văd doar antrenorul și studentul respectiv) și se copiază dintr-un click pentru alt student.
- Calendarul are vedere pe zi (pe ore), săptămână și lună, cu rezumatul ședințelor. Studentul vede în „Antrenorul meu” același calendar, doar cu orele lui, și își poate pune meniul în planificator.

**Mese flexibile**
- În planificator și în meniurile antrenorului, pe lângă mic dejun, prânz și cină, se pot adăuga sau șterge gustări și chindii pentru fiecare zi.

**Moderator**
- Prezentare generală și gestionarea rețetelor și imaginilor. Un administrator îi poate acorda drepturi în plus.

**Administrator**
- Rețete, Produse, Aspect (editor vizual), Utilizatori și roluri, Monetizare, Securitate. Poate gestiona membri și moderatori.

**Administrator principal**
- Tot ce poate un administrator, plus gestionarea altor administratori și fila Sistem (export, import și resetare date).

## Roluri și drepturi

| Drept | Moderator | Administrator | Admin. principal |
|---|:-:|:-:|:-:|
| Rețete și imagini | da | da | da |
| Baza de produse | – | da | da |
| Editor vizual | – | da | da |
| Utilizatori și roluri | – | da | da |
| Monetizare | – | da | da |
| Blocări și securitate | – | da | da |
| Administratori | – | – | da |
| Sistem | – | – | da |

Un administrator poate acorda unui moderator drepturi în plus, doar în limita propriilor drepturi. Nimeni nu își poate schimba propriul rol. Un administrator nu poate modifica alți administratori sau administratorul principal.

## Administrare, pe scurt

- **Rețete și produse:** adăugare, editare, ștergere, imagine pentru fiecare, ingrediente, calorii și macronutrienți.
- **Editor vizual:** butonul „Editează pagina” de pe Acasă. Blocurile paginii (hero, rețete, widgeturi, banner, text, avantaje) se adaugă, se mută, se copiază și se ascund. Fiecare bloc poate fi arătat doar vizitatorilor, doar membrilor sau doar celor cu Premium. Modificările sunt ciornă până apeși **Publică**. „Culori și nume” schimbă tema și numele brandului.
- **Monetizare:** planuri (nume, preț în MDL, număr de zile, activ/inactiv, „Popular”) și limita de rețete gratuite pe lună.
- **Securitate:** blocare de conturi, adrese de email și adrese IP, mod mentenanță, închiderea înregistrărilor noi și jurnal de activitate. Pentru testare, site-ul folosește o adresă IP simulată: blochezi o adresă, apoi schimbi IP-ul simulat la acea adresă ca să vezi ecranul de acces blocat.
- **Conturi:** după 5 parole greșite la rând, autentificarea se blochează 60 de secunde.

## Limitele prototipului

- Datele salvate de versiunile anterioare ale site-ului nu se mută în această versiune (la prima deschidere apar datele demonstrative noi).

Acest site arată cum arată și cum se comportă platforma, dar **nu este o aplicație de producție**:

- **Nu există server sau bază de date.** Datele stau în `localStorage` și nu se văd între dispozitive sau între utilizatori. Un membru nu vede ce face altul.
- **Rolurile se verifică în browser, nu pe server.** Cineva care știe să folosească instrumentele de dezvoltator își poate schimba rolul. Parolele sunt păstrate doar ca hash (PBKDF2) în browserul propriu, ceea ce nu înlocuiește securitatea unui server.
- **Plata Premium este simulată.** Nu există Stripe. „Cumpărarea” unui plan activează Premium pe loc, fără plată.
- **Nu se trimit emailuri.** Resetarea parolei și confirmarea contului cer un server.
- **Blocarea IP este simulată.** Un site static nu poate vedea adresa IP reală a vizitatorilor.
- **Listele partajate cu familia** apar ca funcție viitoare. Butonul „Partajează” doar generează un text pe care îl poți copia.
- **Conținut demonstrativ:** 17 rețete și 150 de produse. Cerința de 100+ rețete la lansare se acoperă din panoul de administrare sau printr-un import în masă, care are nevoie de backend.

## Publicare pe GitHub Pages

1. Deschide depozitul `food-platform` pe GitHub.
2. Apasă **Add file → Upload files**.
3. Trage în pagină fișierul `index.html` (înlocuiește versiunea veche). Poți încărca la fel și `README.md`.
4. Jos, apasă **Commit changes**.
5. La **Settings → Pages**, la „Branch” alege `main` și folderul `/ (root)`, apoi **Save**.
6. După 1–2 minute, deschide https://averyst90.github.io/food-platform/ și apasă **Ctrl + F5** (pe telefon: reîncarcă pagina de două ori) ca să vezi versiunea nouă.

Fișierul `.nojekyll` (gol) spune GitHub-ului să servească fișierul exact cum este. Dacă este deja în depozit, nu trebuie încărcat din nou.

## Pasul următor: versiunea cu server

Pentru lansare reală, partea de interfață de aici se păstrează, iar logica se mută pe server: Next.js, PostgreSQL, plăți Stripe cu webhook, verificarea rolurilor pe server, emailuri și blocare IP reală.
