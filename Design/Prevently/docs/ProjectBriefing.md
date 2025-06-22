**PROJEKTBRIEFING: PREVENTLY APP (NEUE VERSION — FINAL STAND)**

**Slogan:** Krankheiten vermeiden statt heilen

---

**1. ZIEL DER APP:**

Die App soll Menschen auf **leichte, motivierende und interaktive Weise** helfen, ihre Gesundheit präventiv zu verbessern und Krankheiten zu vermeiden. **KEIN schwerer Gesundheitsratgeber.**

✅ Fokus auf leicht umsetzbare, evidenzbasierte “Big Wins”
✅ Schnell erlernbare, dauerhafte Gesundheitsgewohnheiten
✅ Spaßige, snackable UX → Nutzer sollen regelmäßig zurückkommen
✅ App dient als Leadmaschine für Solvbox-Kernprodukt

---

**2. ZIELGRUPPE:**

* Gesundheitsbewusste Erwachsene 18–55+
* Leute, die **wenig Zeit** haben
* Leute, die Gesundheit aktiv verbessern möchten
* Unternehmen, die ihren Mitarbeitern Prävention anbieten möchten (B2B optional)

---

**3. APP-LOGIK & UX:**

✅ **Startscreen = “Personal Board”**

**Aufbau Startscreen:**

1️⃣ **Präventionsscore (Radial Progress Circle)** → groß sichtbar oben

* Kreisanzeige % (z. B. 72%)
* Farbprogression (z. B. von rot zu grün)
* Text drunter: “zuletzt verbessert: +5 Punkte am \[Datum]”

2️⃣ **Aktive Kategorien / Bereiche (Personal Board):**

* Kacheln / Cards pro aktivierter Kategorie → **horizontal scrollbares Deck** (Carousel Style)
* Jeweils kleine Fortschrittsanzeige (z. B. “3/5 Big Wins aktiv”)
* Wenn viele aktive Kategorien (z. B. > 6): automatische Umschaltung auf Grid oder “Alle anzeigen”-Link

3️⃣ **Button “Kategorie hinzufügen”**

* Öffnet Liste der restlichen Kategorien → User kann jederzeit neue Bereiche aktivieren

✅ User klickt auf eine aktive Kategorie → gelangt direkt zu den "Big Wins“-Screens

**Aufbau je "Big Wins“-Screen**

1. **Kurzer Einleitungstext** (5–6 Zeilen max):
   → Warum dieser Bereich wichtig ist

2. **5–6 Big Wins (Pareto-Maßnahmen):**

* Direkt als Liste sichtbar
* JEDE Maßnahme hat ein kleines Info-Icon (i) oder klappbares Feld / Pop-Up:
  → Was ist das?
  → Warum sinnvoll?
  → Wie umsetzen?
  → Optional: Produktlink / Affiliate-Link (muss technisch einfügbar sein)

3. Nutzer wählt pro Big Win **eine von drei Optionen:**

* **“Setze ich schon um”**
* **“Will ich umsetzen”**
* **“Nicht relevant”**

(Darstellung als Segmented Control oder vergleichbare UI → pro Big Win **nur eine Auswahl möglich**)

4. **Nach Speichern:**
   → Automatische Reminder werden aktiviert
   → Präventionsscore wird aktualisiert

5. **Expertenbereich (am unteren Ende des Big Wins Screens):**

* Titel: **“Experten unterstützen dich bei diesem Thema”**
* 2–5 Experten aufgelistet (Bild/Name/kurzer Text)
* CTA: **“Mit Code PREVENTLY jetzt kostenloses Erstgespräch sichern”**
* Link/Button: Kontaktaufnahme (Instagram, Website, Buchungslink o.Ä.)

---

**4. PRÄVENTIONSSCORE:**

✅ Sichtbar im Dashboard (1–100)

✅ Darstellung als **Radial Progress Circle** (farbprogressiv)

✅ Text drunter: “Zuletzt verbessert: +X Punkte am \[Datum]”

✅ Historie als einfache Liste

✅ Score basiert auf **allen Kategorien** (nicht bearbeitete Kategorien zählen als 0%)

✅ User versteht: “Um 100% zu erreichen → alle Kategorien aktiv bearbeiten”

---

**5. REMINDER & NOTIFICATIONS:**

✅ Nach jeder Commitment-Auswahl → automatische Reminder:

→ *“Du wolltest an deiner Mundgesundheit (Zungenschaber, Ölziehen) arbeiten — schon umgesetzt diese Woche?”*

✅ Frequenz:

* Täglich oder alle 2–3 Tage (je nach Maßnahme)
* Wöchentliches Check-In möglich
* 4–6 Wochen: “Willst du deine Angaben in diesem Bereich aktualisieren?”

✅ Notification-Text = per LLM automatisch generiert aus Maßnahme + Commitment + Tone of Voice (Onboarding-Auswahl)

---

**6. CREATORS & PARTNER-INTEGRATION:**

✅ Pro Bereich können 3–5 Creator / Experten angezeigt werden (frei wählbar)
✅ Klick auf Creator-Profil → Kontakt (Instagram / Website / etc.)
✅ Einnahmemöglichkeit für Creator → hohe Motivation zur Bewerbung der App
✅ Zusätzlich: Im Expertenbereich pro Bubble: CTA → “Mit Code PREVENTLY jetzt kostenloses Erstgespräch sichern”

---

**7. MONETARISIERUNG:**

✅ Startpreis: **2,99 € (AppStore / Google Play)**
✅ Split: 50/50 Standard
✅ Einnahmen dienen als Finanzierung für Solvbox-Marketing
✅ Upsells / weitere Monetarisierung möglich:

* Affiliate-Links in Big Wins (technisch vorgesehen)

---

**8. TECHNISCHE ANMERKUNGEN:**

✅ App startet direkt mit Paywall (Onboarding VOR Paywall):

* User gibt Ziele
* Paywall kommt nach Onboarding-Fragen
* Danach freigeschaltet

✅ Navigation: eine Ebene Bubbles → Big Wins
✅ App in wenigen Tagen umsetzbar (wenn Content steht)

---

**9. KATEGORIEN / BUBBLES (FINAL):**

1. Bewegung & Fitness
2. Ernährung & Stoffwechsel
3. Schlaf & Erholung
4. Mentale Gesundheit
5. Vorsorge & Checkups
6. Zahngesundheit
7. Haut, Haare, Nägel
8. Immunsystem & Infektabwehr
9. Longevity & Anti-Aging
10. Verdauung & Darmgesundheit
11. Augengesundheit & Sehkraft
12. Frauen-Gesundheit (je nach dem welches Geschlecht der Nutzer beim Onboarding angegeben hat)
13. Männer-Gesundheit (je nach dem welches Geschlecht der Nutzer beim Onboarding angegeben hat)

(Option: weitere Kategorien bei Bedarf ergänzbar)

---

**10. PRIVATE DEALS & PARTNER-DEALS (TECHNISCHE ANFORDERUNG):**

✅ Es wird in der App einen separaten “Deals”-Screen / Bereich angelegt: → Sortierung in Kategorien (z. B. Supplements, Food, Gadgets, Fitness, etc.) → Jede Kachel: Logo + Rabatt % + Link/Button (z. B. “PREVENTLY10” Code oder Deep Link)

✅ **Private Deals Standard-Modell:**
→ User bekommt exklusiven Rabatt (z. B. 15 %)
→ Prevently bekommt Provision (z. B. 15 %, individuell verhandelbar)
→ Muss technisch möglich sein, Produktlinks + Rabattcode + Provision parallel darzustellen & zu tracken

✅ Funktion muss international erweiterbar und skalierbar sein (mehr Deals, mehr Kategorien, mehrere Länder)

---

**11. USP / KERNIDEEN:**

* Krankheiten vermeiden statt heilen
* Leicht umsetzbare Pareto-Maßnahmen (Big Wins)
* Keine Überforderung → snackable UX
* Gamification durch Präventionsscore
* Creator-driven → motiviert zur Vermarktung
* Ideal als Leadmaschine für Solvebox-Kernprodukt
* Monetarisierbar + später international einfach ausrollbar
* Echte Partner-Deals → Rechtfertigung für 2,99 Preis / Bindung über Monate

---

**12. ONBOARDING-PROZESS:**

1️⃣ **Was willst du mit Prevently für deine Gesundheit erreichen?**
Multiple Choice (mehrere auswählbar):

* Krankheiten vermeiden
* Lange gesund leben
* Mehr Energie
* Fitter werden
* Besser schlafen
* Verbessertes Denkvermögen
* Stärkeres Immunsystem
* Anderes → Freifeld

2️⃣ **Wo liegt bei dir aktuell die größte Baustelle?**
(frei formulierbar ODER Multiple Choice)

3️⃣ **Wie schnell willst du da Verbesserungen sehen?**
(Schieberegler mit Sofort / In 1–2 Monaten / Langfristig)

4️⃣ **Wie stehst du zu unserem Ansatz: Krankheiten vermeiden statt heilen?**
(Sehr sinnvoll / Sinnvoll / Neutral / Nicht sinnvoll)

5️⃣ **Willst du Zugang zu exklusiven Deals & kostenlose Experten-Erstgespräche bekommen?**
Ja / Nein

→ Paywall

---

**Das Briefing ist so gebaut, dass KEINE weiteren Nachfragen vom Entwicklerteam kommen sollten.** 🚀
