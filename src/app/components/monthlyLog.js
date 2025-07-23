"use client";
import React, { useState } from 'react';
import BulletItem from './BulletItem';


const MonthlyLog = ({ entries, onAddEntry, onUpdateEntry, onDeleteEntry }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handlePreviousMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() -1);
    setCurrentDate(newDate)
  }

  const handleNextMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() +1);
    setCurrentDate(newDate)
  }
  
  const formatDate = (date) =>{
    const options = { year: 'numeric', month: 'long'};
    return date.toLocaleDateString('zh-CN', options);
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(2025, 6, 23).getDate();

    const calendarDays = [];
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    weekdays.forEach(day => {
      calendarDays.push(<div key={`weekday-${day}`} className="calendar-weekday">{day}</div>);
    });

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div key={day} className={`calendar-day ${day === today ? 'selected' : ''}`}>
          {day}
        </div>
      );
    }
    return <div className="calendar-grid">{calendarDays}</div>;
  };

  const tasks = [];

  return (
    <div className="log-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{formatDate(currentDate)}</h2>
        <div className="date-nav">
          <button onClick={handlePreviousMonthly}>&lt;</button>
          <button onClick={handleNextMonthly}>&gt;</button>
        </div>
      </div>
      <p className="mb-6 text-gray-500">月度概覽和任務規劃</p>
      
      <div className="card">
        <h3 className="font-bold text-lg mb-4">日曆</h3>
        {renderCalendar()}
      </div>

      <div className="card mt-6">
        <h3 className="font-bold text-lg mb-4">本月任務</h3>
        {tasks.map(item => (
            <BulletItem key={item.id} item={item} />
        ))}
        <button className="add-item-button mt-2">+ 新增項目</button>
      </div>
    </div>
  );
};

export default MonthlyLog;