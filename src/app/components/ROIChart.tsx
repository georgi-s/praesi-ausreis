import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

// Konstanten für die Berechnung
const EINMALIGE_INVESTITION = 3500;
const JAEHRLICHE_KOSTEN = 250;
const JAEHRLICHE_EINSPARUNG = 5950;

// ROI-Berechnung
const calculateROI = (jahr: number) => {
  const gesamteEinsparung = JAEHRLICHE_EINSPARUNG * jahr;
  const gesamteKosten = EINMALIGE_INVESTITION + (JAEHRLICHE_KOSTEN * jahr);
  const roi = ((gesamteEinsparung - gesamteKosten) / gesamteKosten) * 100;
  return Number(roi.toFixed(1));
};

// Datengenerierung mit ROI-Berechnung
const data = [
  {
    name: 'Start',
    Investitionskosten: -EINMALIGE_INVESTITION,
    LaufendeKosten: 0,
    Einsparungen: 0,
    ROI: -100, // Am Start haben wir nur Kosten
  },
  {
    name: 'Jahr 1',
    Investitionskosten: -EINMALIGE_INVESTITION,
    LaufendeKosten: -JAEHRLICHE_KOSTEN,
    Einsparungen: JAEHRLICHE_EINSPARUNG,
    ROI: calculateROI(1), // ROI nach einem Jahr
  },
  {
    name: 'Jahr 2',
    Investitionskosten: -EINMALIGE_INVESTITION,
    LaufendeKosten: -(JAEHRLICHE_KOSTEN * 2), // Kumulativ
    Einsparungen: JAEHRLICHE_EINSPARUNG * 2,  // Kumulativ
    ROI: calculateROI(2), // ROI nach zwei Jahren
  },
];

// Berechne die wichtigsten ROI-Kennzahlen für die Anzeige
const roiJahr1 = calculateROI(1);
const roiJahr2 = calculateROI(2);
console.log(`ROI nach Jahr 1: ${roiJahr1}%`);
console.log(`ROI nach Jahr 2: ${roiJahr2}%`);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === 'ROI' ? '%' : '€'}
            {entry.name === 'ROI' && (
              <span className="text-sm ml-2">
                ({entry.value > 0 ? 'Gewinn' : 'Verlust'})
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ROIChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 50,  
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name"
          tick={{ fill: '#2D3748' }}
        />
        <YAxis 
          yAxisId="left"
          tick={{ fill: '#2D3748' }}
          label={{ 
            value: 'Euro (€)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#2D3748'
          }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          tick={{ fill: '#EB5C37' }}
          label={{ 
            value: 'ROI (%)', 
            angle: 90, 
            position: 'insideRight',
            fill: '#EB5C37'
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top"
          height={36}
        />
        
        {/* Gestapelte Balken für Kosten und Einsparungen */}
        <Bar 
          yAxisId="left" 
          dataKey="Investitionskosten" 
          fill="#EF4444" 
          name="Investitionskosten" 
          stackId="costs"
        />
        <Bar 
          yAxisId="left" 
          dataKey="LaufendeKosten" 
          fill="#F59E0B" 
          name="Laufende Kosten" 
          stackId="costs"
        />
        <Bar 
          yAxisId="left" 
          dataKey="Einsparungen" 
          fill="#10B981" 
          name="Einsparungen"
        />
        
        {/* ROI-Linie mit verbesserter Sichtbarkeit */}
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="ROI" 
          stroke="#EB5C37" 
          name="ROI (%)" 
          strokeWidth={3}
          dot={{ 
            stroke: '#EB5C37',
            strokeWidth: 2,
            r: 6,
            fill: 'white'
          }}
          activeDot={{
            r: 8,
            stroke: '#EB5C37',
            strokeWidth: 2,
            fill: '#EB5C37'
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
