# Basis-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopieren der package.json und package-lock.json
COPY package*.json ./

# Installation der Abhängigkeiten
RUN npm ci

# Kopieren des restlichen Quellcodes
COPY . .

# Prisma generieren
RUN npx prisma generate

# Anwendung bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Umgebungsvariablen setzen
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Anwendung starten
CMD ["npm", "start"]