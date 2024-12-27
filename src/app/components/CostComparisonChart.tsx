import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Analog',
    Personalkosten: 10000,
    Archivierung: 400,
    Korrekturaufwand: 1500,
  },
  {
    name: 'Digital',
    Personalkosten: 5000,
    Archivierung: 200,
    Korrekturaufwand: 750,
  },
];

export function CostComparisonChart() {
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} €`} />
        <Legend />
        <Bar dataKey="Personalkosten" fill="#EB5C37" name="Personalkosten (€)" />
        <Bar dataKey="Archivierung" fill="#2D3748" name="Archivierung (€)" />
        <Bar dataKey="Korrekturaufwand" fill="#90CDF4" name="Korrekturaufwand (€)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
