import React from "react";

const TestFlowDiagram: React.FC = () => {
  const steps = [
    {
      title: "Unit-Tests",
      tool: "Jest",
      details: ["Komponenten-Tests", "API-Routen", "Utility-Funktionen"],
      color: "blue",
    },
    {
      title: "Integrationstests",
      tool: "Cypress",
      details: ["End-to-End Tests", "API-Integration", "Datenbank-Interaktion"],
      color: "green",
    },
    {
      title: "Usability-Tests",
      tool: "Thinking-Aloud",
      details: ["Benutzerinteraktion", "Feedback-Analyse", "UI/UX-Optimierung"],
      color: "purple",
    },
  ];

  return (
    <div className="w-full h-96 flex items-center justify-center mb-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-start relative">
          {steps.map((step, index) => (
            <div key={step.title} className="w-1/3 px-2">
              {/* Verbindungslinien */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-12 left-0 w-full"
                  style={{ zIndex: 0 }}
                >
                  <div className={`h-0.5 w-full bg-${step.color}-500`} />
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 w-24 h-24 mx-auto rounded-full bg-${step.color}-100 border-2 border-${step.color}-500 flex items-center justify-center shadow-lg`}
              >
                <div className="text-center">
                  <div className={`font-bold text-${step.color}-700 text-sm`}>
                    {step.title}
                  </div>
                  <div className={`text-${step.color}-600 text-xs`}>
                    {step.tool}
                  </div>
                </div>
              </div>

              {/* Details Box */}
              <div
                className={`mt-4 p-3 bg-${step.color}-50 border border-${step.color}-200 rounded-lg shadow`}
              >
                <ul className="text-xs space-y-1">
                  {step.details.map((detail, i) => (
                    <li key={i} className={`text-${step.color}-700`}>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Badge */}
              <div
                className={`mt-2 mx-auto w-20 py-1 text-center text-xs rounded-full bg-${step.color}-100 text-${step.color}-700`}
              >
                ✓ Erfolgreich
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Box */}
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
          <h4 className="text-sm font-bold text-gray-700 mb-2">
            Feedback-Ergebnisse
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <span className="text-gray-600">
                Intuitive Benutzeroberfläche
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <span className="text-gray-600">Effiziente Prozesse</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <span className="text-gray-600">Hohe Benutzerakzeptanz</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <span className="text-gray-600">Schnelle Einarbeitung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFlowDiagram;
