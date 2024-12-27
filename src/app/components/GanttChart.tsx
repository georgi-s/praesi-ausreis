import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Konvertiere Stunden in Tage (8h = 1 Arbeitstag)
const hoursToDays = (hours: number) => Number((hours / 8).toFixed(2));

const tasks = [
  // Planung: 6 Stunden
  {
    id: 'ist-analyse',
    name: 'Ist-Analyse',
    start: 0,
    duration: hoursToDays(1),
    color: '#4A90E2',
    phase: 'Planung'
  },
  {
    id: 'wirtschaft',
    name: 'Wirtschaftlichkeitsprüfung',
    start: hoursToDays(1),
    duration: hoursToDays(2),
    color: '#9B59B6',
    phase: 'Planung'
  },
  {
    id: 'lastenheft',
    name: 'Lastenheft',
    start: hoursToDays(3),
    duration: hoursToDays(3),
    color: '#E67E22',
    phase: 'Planung'
  },
  
  // Entwurf: 9 Stunden
  {
    id: 'datenbank',
    name: 'Datenbankmodell',
    start: hoursToDays(6),
    duration: hoursToDays(1),
    color: '#F1C40F',
    phase: 'Entwurf'
  },
  {
    id: 'api-struktur',
    name: 'API-Struktur',
    start: hoursToDays(7),
    duration: hoursToDays(4),
    color: '#2ECC71',
    phase: 'Entwurf'
  },
  {
    id: 'pflichtenheft',
    name: 'Pflichtenheft',
    start: hoursToDays(11),
    duration: hoursToDays(4),
    color: '#E74C3C',
    phase: 'Entwurf'
  },

  // Durchführung: 38 Stunden
  {
    id: 'frontend',
    name: 'Benutzeroberfläche',
    start: hoursToDays(15),
    duration: hoursToDays(15.5),
    color: '#3498DB',
    phase: 'Durchführung'
  },
  {
    id: 'backend',
    name: 'Backend-Logik',
    start: hoursToDays(15),
    duration: hoursToDays(15.5),
    color: '#1ABC9C',
    phase: 'Durchführung'
  },
  {
    id: 'api-komm',
    name: 'API-Kommunikation',
    start: hoursToDays(30.5),
    duration: hoursToDays(5),
    color: '#F39C12',
    phase: 'Durchführung'
  },
  {
    id: 'docker',
    name: 'Docker-Container',
    start: hoursToDays(35.5),
    duration: hoursToDays(2),
    color: '#8E44AD',
    phase: 'Durchführung'
  },

  // Projektabschluss: 11 Stunden
  {
    id: 'tests',
    name: 'Tests',
    start: hoursToDays(37.5),
    duration: hoursToDays(5),
    color: '#16A085',
    phase: 'Projektabschluss'
  },
  {
    id: 'kosten-nutzen',
    name: 'Kosten-Nutzen-Analyse',
    start: hoursToDays(42.5),
    duration: hoursToDays(2),
    color: '#D35400',
    phase: 'Projektabschluss'
  },
  {
    id: 'soll-ist',
    name: 'Soll-Ist-Vergleich',
    start: hoursToDays(44.5),
    duration: hoursToDays(2),
    color: '#27AE60',
    phase: 'Projektabschluss'
  },
  {
    id: 'uebergabe',
    name: 'Übergabe',
    start: hoursToDays(46.5),
    duration: hoursToDays(2),
    color: '#2980B9',
    phase: 'Projektabschluss'
  }
];

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderRadius: 8,
      borderSkipped: false as const,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const task = tasks[context.dataIndex];
          const hours = (task.duration * 8).toFixed(1);
          return [
            `Phase: ${task.phase}`,
            `Start: Tag ${(task.start * 8).toFixed(1)}h`,
            `Dauer: ${hours}h`,
          ];
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        callback: function(value: any) {
          return `${value * 8}h`;
        },
        color: '#2D3748',
      },
      title: {
        display: true,
        text: 'Projektstunden',
        color: '#2D3748',
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#2D3748',
      }
    }
  }
};

export function GanttChart() {
  const data = {
    labels: tasks.map(task => task.name),
    datasets: tasks.map((task, index) => ({
      label: task.name,
      data: tasks.map((_, i) => i === index ? task.duration : null),
      backgroundColor: task.color,
      borderColor: 'transparent',
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      skipNull: true,
      barThickness: 20,
    }))
  };

  return (
    <div className="w-full h-full p-4">
      <Bar options={options} data={data} />
    </div>
  );
}
