import React from "react";

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full h-96 flex -center mb-6 justify-center relative">
      <div className="relative w-screen h-screen  max-w-2xl">
        {/* Container für bessere Positionierung */}
        <div className="absolute inset-0 flex flex-col   items-center">
          <div className="w-[400px]">
            {/* Docker Container Box */}
            <div className="w-full px-0 py-2 bg-[#0db7ed]/10 border border-[#0db7ed]/30 rounded-lg mb-1">
              <h3 className="text-center font-semibold text-[#0db7ed] text-xs mb-1">
                Docker Container
              </h3>

              {/* Frontend Box */}
              <div className="w-36 p-2 bg-blue-100 border border-blue-300 rounded-lg mb-16 mx-auto">
                <h3 className="text-center font-semibold text-blue-700 text-xs mb-1">
                  Frontend
                </h3>
                <div className="text-xs text-blue-600">
                  <p>• Next.js</p>
                  <p>• React Components</p>
                  <p>• Server Components</p>
                </div>
              </div>

              {/* Mittlere Ebene mit Datenbank und Storage */}
              <div className="flex justify-between w-full px-4 ">
                {/* Database Box */}
                <div className="w-32 p-2 bg-green-100 border border-green-300 rounded-lg">
                  <h3 className="text-center font-semibold text-green-700 text-xs mb-1">
                    Datenbank
                  </h3>
                  <div className="text-xs flex flex-col items-center text-green-600">
                    <p>PostgreSQL</p>
                  </div>
                </div>

                {/* Storage Box */}
                <div className="w-32 p-2 bg-purple-100 border border-purple-300 rounded-lg">
                  <h3 className="text-center font-semibold text-purple-700 text-xs mb-1">
                    Dateispeicher
                  </h3>
                  <div className="text-xs flex flex-col items-center text-purple-600">
                    <p>MinIO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Container für Pfeile und Labels */}
        <div className="absolute inset-0 mt-36 ml-32">
          {/* SVG für Verbindungslinien */}
          <svg className="w-full h-full" style={{ zIndex: -5 }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#4B5563" />
              </marker>
            </defs>

            {/* Frontend zu Datenbank */}
            <path
              d="M 200,80 L 120,140"
              stroke="#4B5563"
              strokeWidth="1"
              fill="none"
              markerEnd="url(#arrowhead)"
            />

            {/* Frontend zu Storage */}
            <path
              d="M 200,80 L 280,140"
              stroke="#4B5563"
              strokeWidth="1"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* API Route Labels */}
          <div className="absolute left-1/3 top-1/2 -translate-y-4 -translate-x-32">
            <span className="text-xs text-gray-600">API Routes</span>
          </div>
          <div className="absolute right-1/3 top-1/2 -translate-y-4 translate-x-32">
            <span className="text-xs text-gray-600">API Routes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
