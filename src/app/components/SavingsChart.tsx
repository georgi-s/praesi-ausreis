import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  {
    category: 'Bearbeitungszeit',
    vorher: 300,
    nachher: 120,
    einheit: 'Minuten pro Monat'
  },
  {
    category: 'Personalkosten',
    vorher: 10000,
    nachher: 5000,
    einheit: '€ pro Jahr'
  },
  {
    category: 'Archivierungskosten',
    vorher: 400,
    nachher: 200,
    einheit: '€ pro Jahr'
  },
  {
    category: 'Korrekturaufwand',
    vorher: 1500,
    nachher: 750,
    einheit: '€ pro Jahr'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = data.find(d => d.category === label);
    const einheit = item?.einheit || '';
    const einsparung = payload[0].value - payload[1].value;
    const prozent = ((einsparung / payload[0].value) * 100).toFixed(0);

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-gray-600">Vorher: {payload[0].value} {einheit}</p>
        <p className="text-gray-600">Nachher: {payload[1].value} {einheit}</p>
        <p className="text-green-600 font-bold">
          Einsparung: {einsparung} {einheit} ({prozent}%)
        </p>
      </div>
    );
  }
  return null;
};

export const SavingsChart: React.FC = () => {
  return (
    <div className="w-full h-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
          />
          <YAxis 
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#4B5563" />
          <Bar dataKey="vorher" name="Vorher" fill="#EF4444" />
          <Bar dataKey="nachher" name="Nachher" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsChart;
