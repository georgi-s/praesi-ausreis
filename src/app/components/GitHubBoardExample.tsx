import React from 'react';

const GitHubBoardExample = () => {
  return (
    <div className="w-full bg-[#0D1117] p-6 rounded-lg text-white">
      <div className="flex gap-4">
        {/* To Do Spalte */}
        <div className="flex-1 bg-[#161B22] rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">📋 To Do</h3>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#238636] rounded-full">Feature</span>
            </div>
            <h4 className="text-sm font-medium">Auslagen-Formular entwickeln</h4>
            <p className="text-xs text-gray-400 mt-1">#123 opened 2 days ago</p>
          </div>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#8957E5] rounded-full">Task</span>
            </div>
            <h4 className="text-sm font-medium">PDF-Export implementieren</h4>
            <p className="text-xs text-gray-400 mt-1">#124 opened 1 day ago</p>
          </div>
        </div>

        {/* In Progress Spalte */}
        <div className="flex-1 bg-[#161B22] rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">🔄 In Progress</h3>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#1F6FEB] rounded-full">Enhancement</span>
            </div>
            <h4 className="text-sm font-medium">Reisekosten-API Integration</h4>
            <p className="text-xs text-gray-400 mt-1">#122 in progress</p>
          </div>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#D29922] rounded-full">Bug</span>
            </div>
            <h4 className="text-sm font-medium">Validierung Datumsformat</h4>
            <p className="text-xs text-gray-400 mt-1">#125 fixing</p>
          </div>
        </div>

        {/* Done Spalte */}
        <div className="flex-1 bg-[#161B22] rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">✅ Done</h3>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#8957E5] rounded-full">Documentation</span>
            </div>
            <h4 className="text-sm font-medium">API Dokumentation erstellen</h4>
            <p className="text-xs text-gray-400 mt-1">#121 merged 1 day ago</p>
          </div>
          <div className="bg-[#21262D] p-3 rounded-lg mb-2 cursor-pointer hover:bg-[#30363D] border border-[#30363D]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-[#238636] rounded-full">Feature</span>
            </div>
            <h4 className="text-sm font-medium">Login-System implementieren</h4>
            <p className="text-xs text-gray-400 mt-1">#120 merged 2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubBoardExample;
