# 🌱 Familienarbeitsstunden Montessori-Campus Wertingen

Eine kleine, lokale Web-App zur Erfassung von Familienarbeitsstunden — installierbar als PWA auf iOS und Android, ganz ohne Server, ohne Account und ohne Cloud.

---

## 📲 Schnellstart für alle — so installierst du die App

Diese Anleitung richtet sich an alle, auch ohne technische Vorkenntnisse. Es dauert nur ein bis zwei Minuten.

### Was ist eine "PWA" überhaupt?

PWA steht für "Progressive Web App". Das ist im Grunde eine Webseite, die man sich wie eine echte App auf den Home-Bildschirm des Handys legen kann. Man muss dafür **nichts aus dem App Store oder Play Store laden** — es genügt, einmal einen Link im Browser zu öffnen und ein Symbol auf dem Startbildschirm zu speichern. Danach verhält sich die App wie jede andere App: eigenes Icon, eigener Vollbild-Start, funktioniert auch ohne Internetverbindung.

### Installation auf dem iPhone (iOS / Safari)

1. Öffne den Link zur App **in Safari** (nicht in Chrome oder einem anderen Browser — auf dem iPhone funktioniert die Installation nur über Safari)
2. Tippe unten in der Leiste auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben ⬆️)
3. Im aufklappenden Menü etwas nach unten scrollen und **„Zum Home-Bildschirm"** antippen
4. Oben rechts auf **„Hinzufügen"** tippen
5. Fertig — auf dem Home-Bildschirm erscheint jetzt ein gelbes App-Symbol 🌱 mit dem Namen „FAM Wertingen"

### Installation auf Android (Chrome)

1. Öffne den Link zur App in **Chrome**
2. Tippe oben rechts auf die **drei Punkte** (⋮)
3. Wähle **„App installieren"** oder **„Zum Startbildschirm hinzufügen"**
4. Im folgenden Dialog auf **„Installieren"** bestätigen
5. Fertig — die App erscheint jetzt wie jede andere App auf dem Startbildschirm

### Was die App macht (in Kürze)

- Man trägt Datum, Dauer und eine kurze Beschreibung der geleisteten Arbeit ein
- Alle Einträge bleiben **nur auf dem eigenen Handy** gespeichert — nichts wird irgendwohin hochgeladen
- Am Ende exportiert man die Liste als Datei (CSV) und schickt sie z. B. per E-Mail
- Vater und Mutter können das unabhängig auf ihren eigenen Handys machen und die Listen am Ende zusammenführen

### Wichtig zu wissen, bevor man loslegt

⚠️ Da alles nur lokal auf dem Handy gespeichert wird, sollte man hin und wieder ein **Backup** machen (ein Knopfdruck in der App) — sonst können die Daten im schlimmsten Fall verloren gehen, z. B. wenn man die App länger nicht öffnet. Mehr dazu weiter unten im Abschnitt [„Warum ein Backup wichtig ist"](#️-warum-ein-backup-wichtig-ist).

Eine ausführliche Anleitung zu allen Funktionen findet man außerdem direkt **in der App selbst** unter dem ❓-Symbol oben rechts.

---

## Über das Projekt

Diese App wurde von **Ernest Jennen**, Elternteil am Montessori-Campus Wertingen, in Eigeninitiative entwickelt. Sie soll Familien dabei unterstützen, ihre geleisteten Arbeitsstunden unkompliziert auf dem eigenen Handy zu erfassen — und am Ende des Schuljahres (oder bei Bedarf) als CSV-Datei zu exportieren.

Die App ist **kein offizielles Werkzeug der Schule**, sondern eine freiwillige, private Unterstützung. Den vollständigen Haftungsausschluss findest du direkt in der App unter ⚙️ Einstellungen.

## Funktionen

- ➕ **Erfassen** – Datum, Dauer und Beschreibung eintragen, Kategorie optional auswählen
- 📋 **Verlauf** – alle Einträge einsehen, bearbeiten, einzeln oder im Batch löschen
- 📤 **Export** – als CSV herunterladen oder per E-Mail versenden
- 💾 **Backup** – vollständige Datensicherung als JSON-Datei, jederzeit wiederherstellbar
- ❓ **Hilfe** – integrierte Anleitung direkt in der App
- 📱 **PWA** – auf dem Homescreen installierbar, läuft offline

## Wie die App Daten speichert

Alle Einträge werden **ausschließlich lokal auf dem jeweiligen Gerät** im Browserspeicher (`localStorage`) abgelegt. Es gibt:

- keinen Server
- keine Cloud-Synchronisierung
- keinen Account / kein Login
- keine Übertragung von Daten an Dritte

Das bedeutet auch: Jede Person erfasst ihre Stunden auf ihrem eigenen Gerät. Mehrere Familienmitglieder (z. B. Vater und Mutter) nutzen die App unabhängig voneinander und führen ihre Daten am Ende über den CSV-Export zusammen.

## ⚠️ Warum ein Backup wichtig ist

`localStorage` ist **kein dauerhaft sicherer Speicher**. Folgende Situationen können zu vollständigem Datenverlust führen:

- **iOS "Intelligent Tracking Prevention" (ITP):** Safari löscht lokale Web-App-Daten automatisch, wenn eine Seite/PWA rund 7 Tage lang nicht aktiv geöffnet wurde. Das betrifft auch installierte Homescreen-Apps.
- **Cache leeren:** Wird der Browser-Cache manuell geleert, gehen `localStorage`-Daten i. d. R. mit verloren.
- **Browser-Neuinstallation:** Eine Neuinstallation von Safari oder Chrome setzt den gesamten lokalen Speicher zurück.
- **Gerätewechsel:** Da nichts synchronisiert wird, sind Daten beim Gerätewechsel nicht automatisch verfügbar.

**Deshalb bietet die App zwei Sicherungsmechanismen:**

1. **JSON-Backup** (Export-Tab → „Backup speichern") — sichert alle Einträge inkl. Name und Schuljahr in einer Datei, die jederzeit über „Backup importieren" vollständig wiederhergestellt werden kann.
2. **Automatischer Backup-Hinweis** — nach jedem Speichern, Bearbeiten oder Löschen erscheint ein dezenter, schließbarer Banner, der an ein Backup erinnert.

**Empfehlung:** Nach jeder Erfassungssitzung kurz auf „Sichern" tippen oder das Backup manuell im Export-Tab auslösen. Der CSV-Export (für die Schule) ersetzt das **nicht** vollständig, da er nicht direkt re-importierbar ist — für eine echte Wiederherstellung ist ausschließlich das JSON-Backup geeignet.

## Offline-Nutzung (Service Worker)

Die App enthält einen Service Worker (`sw.js`), der die App-Hülle (HTML, CSS, Schriftarten) lokal cached. Dadurch startet die App zuverlässig auch ohne Internetverbindung — z. B. im Funkloch oder Flugmodus.

**Wichtig:** Der Service Worker cached nur die Anwendung selbst, **nicht** die eingegebenen Daten. Eure Einträge liegen unabhängig davon in `localStorage` und unterliegen weiterhin den oben beschriebenen Risiken — der Service Worker ersetzt also kein Backup.

## Installation auf dem Handy

Siehe Abschnitt [„📲 Schnellstart für alle"](#-schnellstart-für-alle--so-installierst-du-die-app) ganz oben in dieser README.

## Lokales Hosting (GitHub Pages)

Dieses Repository enthält:

```
arbeitsstunden.html   ← Hauptanwendung
manifest.json         ← PWA-Manifest
sw.js                 ← Service Worker (Offline-Unterstützung für die App-Hülle)
icon-192.png          ← App-Icon (klein)
icon-512.png          ← App-Icon (groß)
```

Um die App über GitHub Pages bereitzustellen:

1. Repository-Einstellungen → **Pages** → Branch auswählen (z. B. `main`)
2. Die App ist anschließend erreichbar unter:
   `https://<benutzername>.github.io/<repo-name>/arbeitsstunden.html`

## Technologie

- Reines HTML/CSS/JavaScript — keine Build-Tools, keine Frameworks
- `localStorage` für die Datenhaltung
- Web Manifest für PWA-Installierbarkeit
- Keine externen Abhängigkeiten außer Google Fonts (DM Sans, DM Mono)

## Haftungsausschluss

Diese App wurde in Eigeninitiative ohne offizielle Beauftragung durch die Schule entwickelt. Sie erhebt keinen Anspruch auf Vollständigkeit, Richtigkeit oder rechtliche Verbindlichkeit. Für die Korrektheit der erfassten Stunden ist jede Familie selbst verantwortlich; die offiziellen Vorgaben der Schule sind maßgeblich. Der Entwickler übernimmt keine Haftung für Datenverlust oder Schäden durch die Nutzung dieser App.

## Lizenz / Nutzung

Frei nutzbar für Familien am Montessori-Campus Wertingen. Bei Fragen oder Verbesserungsvorschlägen gerne ein Issue eröffnen.

---

**Version 1.4.0** · Entwickelt von Ernest Jennen
