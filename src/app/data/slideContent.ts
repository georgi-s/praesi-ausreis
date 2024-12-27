export interface SlideContent {
  additionalContent: string;
  title: string;
  content: string;
  gradient: string;
}

export const slides: SlideContent[] = [
  {
    title:
      "Digitalisierung und Automatisierung der Erfassung und Abrechnung von Auslagen und Reisekosten",
    content:
      "Georgi Semov\nReedu GmbH & Co. KG\nZeitraum: Oktober 2023 - Januar 2024",
    gradient: "react",
    additionalContent: "Firmenlogo und abstrakte Datenvisualisierung",
  },
  {
    title: "Warum war das Projekt notwendig?",
    content:
      "• Der analoge Prozess war ineffizient und fehleranfällig\n• Ziel: Prozesse digitalisieren, Transparenz und Effizienz steigern",
    gradient: "next",
    additionalContent:
      "Vorher-Nachher-Diagramm (analog vs. digital)\nIcon für Effizienz/Transparenz",
  },
  {
    title: "Projektmanagement mit GitHub Projects",
    content:
      "• Nutzung von GitHub Projects als Kanban-Tool\n• Erstellung und Verknüpfung von Tickets für Aufgaben\n• Organisation in Spalten: To Do, In Progress, Done\n• Fortschrittskontrolle durch Verknüpfung mit Pull Requests",
    gradient: "typescript",
    additionalContent:
      "Screenshot des GitHub-Boards mit beschrifteten Spalten\nBeispiel-Ticket: 'Frontend-Formular entwickeln'",
  },
  {
    title: "Vergleich IST- und SOLL-Zustand",
    content:
      "IST:\n• Zeitaufwendige manuelle Prozesse\n• Fehleranfällig\n• Keine Transparenz\n\nSOLL:\n• Digitale Erfassung\n• Automatisierte Prozesse\n• Transparente Statusverfolgung",
    gradient: "tailwind",
    additionalContent:
      "Tabelle mit zwei Spalten (IST/SOLL)\nIcons für jede Kategorie",
  },
  {
    title: "Zeitplanung",
    content:
      "Vier Phasen:\n• Planung (6 Stunden)\n• Entwurf (9 Stunden)\n• Durchführung (38 Stunden)\n• Abschluss (11 Stunden)\n\nGesamt: 80 Stunden",
    gradient: "node",
    additionalContent:
      "Zeitstrahl oder Gantt-Diagramm mit farblicher Abgrenzung der Phasen",
  },
  {
    title: "Architektur und Technologien",
    content:
      "Drei Komponenten:\n• Next.js (Frontend, API)\n• PostgreSQL (Datenbank)\n• MinIO (Dateispeicherung)\n\nContainerisierung mit Docker für Reproduzierbarkeit",
    gradient: "react",
    additionalContent:
      "Diagramm der Architektur (Interaktion zwischen Frontend, Datenbank und MinIO)",
  },
  {
    title: "Ergebnisse der Anwendung",
    content:
      "• Intuitive Benutzeroberfläche für Mitarbeitende\n• Automatisierte Genehmigungs- und Statusverfolgungsprozesse\n• Admin-Dashboard mit erweiterten Funktionen",
    gradient: "next",
    additionalContent:
      "Screenshot der Benutzeroberfläche\nDiagramm: Einsparungen",
  },
  {
    title: "Qualitätssicherung",
    content:
      "Tests:\n• Unit-Tests (mit Jest)\n• Integrationstests (mit Cypress)\n• Usability-Test mit Thinking-Aloud-Methode\n\nFeedback: Benutzer lobten intuitive Oberfläche und Effizienz",
    gradient: "typescript",
    additionalContent:
      "Ablaufdiagramm der Tests\nStichpunkte mit den wichtigsten Ergebnissen",
  },
  {
    title: "Kosten-Nutzen-Analyse",
    content:
      "• Kosten: 3.500 € einmalig + 250 € jährlich\n• Einsparung: 50 % der Bearbeitungskosten (~5.950 €/Jahr)",
    gradient: "tailwind",
    additionalContent:
      "Balkendiagramm: Vergleich der Kosten (analog vs. digital)",
  },
  {
    title: "Fazit und Ausblick",
    content:
      "Fazit:\n• Projektziele vollständig erreicht\n• Reedu profitiert von effizienterem Prozess und höherer Transparenz\n\nAusblick:\n• Mobile-App mit Offline-Funktionalität\n• OCR-Integration zur automatischen Belegerfassung",
    gradient: "node",
    additionalContent:
      "Timeline oder Icons (Smartphone für Mobile-App, Scanner für OCR)",
  },
  {
    title: "Vielen Dank!",
    content:
      "Zusammenfassung der wichtigsten Punkte:\n• Digitalisierung des Abrechnungsprozesses\n• Effizienzsteigerung durch Automatisierung\n• Positive Kosten-Nutzen-Analyse\n\nKontakt: georgi.kirtchev@reedu.de",
    gradient: "react",
    additionalContent: "Firmenlogo und Kontaktinformationen",
  },
];
