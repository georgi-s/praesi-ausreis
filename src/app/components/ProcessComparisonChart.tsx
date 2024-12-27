import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Hilfsfunktion für die Generierung der Ticks
const generateTicks = (start: number, end: number, step: number = 1) => {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step
  );
};

const data = [
  {
    name: "Analog",
    Zeitaufwand: 20, // 20 Stunden pro Monat
    Fehler: 8, // 8 Fehler pro Monat
    Transparenz: 3, // Score 3 von 10
  },
  {
    name: "Digital",
    Zeitaufwand: 8, // 8 Stunden pro Monat
    Fehler: 2, // 2 Fehler pro Monat
    Transparenz: 9, // Score 9 von 10
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => {
          let value = entry.value;
          let unit = "";

          switch (entry.name) {
            case "Zeitaufwand":
              unit = " Stunden/Monat";
              break;
            case "Fehler":
              unit = " Fehler/Monat";
              break;
            case "Transparenz":
              unit = "/10";
              break;
          }

          return (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {value}
              {unit}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export function ProcessComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#2D3748" }} />
        <YAxis
          tick={{ fill: "#2D3748" }}
          label={{
            value: "Wert",
            angle: -90,
            position: "insideLeft",
            fill: "#2D3748",
          }}
          ticks={generateTicks(0, 20)} // Generiert Ticks von 0 bis 20 in 1er-Schritten
          domain={[0, 20]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Zeitaufwand" fill="#EB5C37" name="Zeitaufwand" />
        <Bar dataKey="Fehler" fill="#2D3748" name="Fehler" />
        <Bar dataKey="Transparenz" fill="#90CDF4" name="Transparenz" />
      </BarChart>
    </ResponsiveContainer>
  );
}
