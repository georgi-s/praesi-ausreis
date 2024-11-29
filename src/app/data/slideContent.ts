export interface SlideContent {
  title: string;
  content: string;
  gradient: string;
}

export const slides: SlideContent[] = [
  {
    title: "Einleitung und Motivation",
    content:
      "Entwicklung eines webbasierten Tools zur Automatisierung der Erfassung und Abrechnung von Auslagen und Reisekosten für Reedu GmbH & Co. KG.",
    gradient: "pink",
  },
  {
    title: "Projektübersicht",
    content:
      "Hauptziele: Digitale Erfassung, automatisierte Genehmigungsprozesse, transparente Statusverfolgung, Integration in bestehende IT-Infrastruktur.",
    gradient: "teal",
  },
  {
    title: "Technische Umsetzung",
    content:
      "Verwendete Technologien: Next.js, PostgreSQL, MINIO Object Storage, Docker. Implementierung von Benutzerauthentifizierung, Datenbankoperationen und Dateiverarbeitung.",
    gradient: "tomato",
  },
  {
    title: "Ergebnisse und Vorteile",
    content:
      "60% Effizienzsteigerung im Abrechnungsprozess, Reduzierung von Fehlerquellen, erhöhte Transparenz und Benutzerfreundlichkeit, verbesserte Datenverwaltung und -sicherheit.",
    gradient: "green",
  },
  {
    title: "Wirtschaftliche Betrachtung",
    content:
      "Kosten-Nutzen-Analyse: Amortisation der Entwicklungskosten innerhalb des ersten Jahres.",
    gradient: "purple",
  },
  {
    title: "Fazit und Ausblick",
    content:
      "Erfolgreiche Digitalisierung, signifikante Effizienzsteigerung. Zukünftig: Entwicklung einer nativen Mobile-App, Integration von KI, Erweiterung der Analysefunktionen.",
    gradient: "yellow",
  },
];
