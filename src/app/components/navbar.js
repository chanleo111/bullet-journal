import React from 'react';

const Navbar = ({ activeView, setActiveView }) => {
  const views = ['介紹','每日誌', '每月誌', '未來誌', '主題頁'];

  return (
    <div className="bg-gray-200 rounded-full p-1 flex items-center justify-center space-x-1">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            activeView === view
              ? 'bg-white text-gray-900 shadow'
              : 'bg-transparent text-gray-600 hover:bg-gray-300'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
