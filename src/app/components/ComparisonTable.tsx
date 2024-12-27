import React from 'react';
import { FaHourglassHalf, FaExclamationTriangle, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineDocumentScanner, MdAutorenew, MdVisibility } from 'react-icons/md';

const ComparisonTable = () => {
  const comparisons = [
    {
      ist: { text: 'Zeitaufwendige manuelle Prozesse', icon: FaHourglassHalf },
      soll: { text: 'Digitale Erfassung', icon: MdOutlineDocumentScanner }
    },
    {
      ist: { text: 'Fehleranfällig', icon: FaExclamationTriangle },
      soll: { text: 'Automatisierte Prozesse', icon: MdAutorenew }
    },
    {
      ist: { text: 'Keine Transparenz', icon: FaEyeSlash },
      soll: { text: 'Transparente Statusverfolgung', icon: MdVisibility }
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {/* Headers */}
        <div className="bg-red-100 p-4 rounded-t-lg">
          <h3 className="text-xl font-bold text-center text-red-800">IST-Zustand</h3>
        </div>
        <div className="bg-green-100 p-4 rounded-t-lg">
          <h3 className="text-xl font-bold text-center text-green-800">SOLL-Zustand</h3>
        </div>

        {/* Content */}
        {comparisons.map((comparison, index) => (
          <React.Fragment key={index}>
            {/* IST */}
            <div className="bg-white/80 p-4 flex items-center space-x-3 rounded-lg shadow-sm">
              <comparison.ist.icon className="text-red-600 text-2xl flex-shrink-0" />
              <span className="text-gray-800">{comparison.ist.text}</span>
            </div>
            {/* SOLL */}
            <div className="bg-white/80 p-4 flex items-center space-x-3 rounded-lg shadow-sm">
              <comparison.soll.icon className="text-green-600 text-2xl flex-shrink-0" />
              <span className="text-gray-800">{comparison.soll.text}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
