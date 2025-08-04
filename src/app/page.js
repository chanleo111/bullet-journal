"use client";
import React, { useState, useCallback } from 'react';
import Navbar from './components/navbar';
import DateNavigator from './components/dateNavigator';
import DailyLog from './components/dailyLog';
import MonthlyLog from './components/monthlyLog';
import MonthNavigator from './components/monthNavigator';
import FutureLog from './components/futureLog';
import FutureNavigator from './components/futureNavigator';
import CollectionLog from './components/collectionLog';
import { Container,Row,Col } from 'react-bootstrap';
import ChatBot from './components/chatbot/chatbot';
console.log(ChatBot);
const Home = () => {
  const [activeView, setActiveView] = useState('每日誌');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = useCallback((newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      const updatedDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      if (!currentDate || updatedDate.toDateString() !== currentDate.toDateString()) {
        console.log('Updated currentDate:', updatedDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
        setCurrentDate(updatedDate);
      }
    }
  }, [currentDate]);

  const renderActiveView = () => {
    switch (activeView) {
      case '每日誌':
        return (
          <>
            <Container>
              <DateNavigator currentDate={currentDate} setCurrentDate={handleDateChange} />
              <DailyLog currentDate={currentDate} />
            </Container>
          </>
        );
      case '每月誌':
        return (
          <Container fluid>
            <Row>
              <Col xs={12} sm={6} md={4} className="month-navigator">
                <MonthNavigator currentDate={currentDate} setCurrentDate={handleDateChange} />
              </Col>
              <Col xs={12} sm={6} md={8} className="monthly-log">
                <MonthlyLog currentDate={currentDate} />
              </Col>
            </Row>
          </Container>
        );
      case '未來誌':
        return (
          <Container fluid>
            <Row>
              <Col xs={12} sm={6} md={4} className="">
                <FutureNavigator currentDate={currentDate} setCurrentDate={handleDateChange} />
              </Col>
              <Col xs={12} sm={6} md={4} className="">
                <FutureLog currentDate={currentDate} />
              </Col>
            </Row>
          </Container>
        );
      case '主題頁':
        return <CollectionLog />;
      case '介紹':
        return <ChatBot/>
      default:
        return <DailyLog currentDate={currentDate} />;
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