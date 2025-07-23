"use client";
import React, { useState } from 'react';
import Navbar from './components/navbar';
import DateNavigator from './components/dateNavigator';
import DailyLog from './components/dailyLog';
import MonthlyLog from './components/monthlyLog';
import YearlyLog from './components/yearlyLog';
import CollectionLog from './components/collectionLog';

const Home = () => {
  const [activeView, setActiveView] = useState('每日誌');
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderActiveView = () => {
    switch (activeView) {
      case '每日誌':
        return (
          <>
            <DateNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <DailyLog />
          </>
        );
      case '每月誌':
        return <MonthlyLog />;
      case '未來誌':
        return <YearlyLog />;
      case '主題頁':
        return <CollectionLog />;
      default:
        return <DailyLog />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">子彈筆記本</h1>
          <p className="text-gray-500 mt-1">數位化的 Bullet Journal Method，幫你有效管理任務、事件和筆記</p>
        </header>
        
        <Navbar activeView={activeView} setActiveView={setActiveView} />

        <main className="mt-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default Home;