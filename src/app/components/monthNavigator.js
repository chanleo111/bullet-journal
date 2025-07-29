import React, { useMemo, useState } from 'react';
import { faArrowLeft, faArrowRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthPicker } from './date/monthPicker';

const MonthNavigator = ({ currentDate: initialDate = new Date(), setCurrentDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate.getDate());

  const currentDate = useMemo(() => {
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), selectedDate || 1);
    }, [initialDate, selectedDate]);

  const handlePreviousMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    console.log('Previous Month:', newDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    setCurrentDate(newDate);
  };

  const handleNextMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.getDate());
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const calendarDays = [];
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    weekdays.forEach(day => {
      calendarDays.push(
        <div key={`weekday-${day}`} className="calendar-weekday">
          {day}
        </div>
      );
    });

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = (
        day === currentDay &&
        month === currentMonth &&
        year === currentYear
      );
      const isSelected = day === selectedDate;

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          <div className="day-number">{day}</div>
        </div>
      );
    }

    return <div className="calendar-grid">{calendarDays}</div>;
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long' }; 
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    
    <div className="flex items-center justify-between my-8">
      <div className="log-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
          <MonthPicker 
           currentDate={formatDate(currentDate)}
           onchange={setCurrentDate}
          />
          </h2>
        </div>
        <div className="card p-4 mb-6">
        <p className="mb-6 text-gray-500">每月待辨事項規劃</p>
        
        </div>
          {renderCalendar()}
        </div>

    </div>
  );
};

export default MonthNavigator;