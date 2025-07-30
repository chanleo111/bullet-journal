import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { faArrowLeft, faArrowRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthPicker } from './date/monthPicker';

const MonthNavigator = ({ currentDate: initialDate = new Date(), setCurrentDate }) => {
  const isMounted = useRef(false);
  const [selectedDate, setSelectedDate] = useState(initialDate.getDate());
  const [selectedYearMonth, setSelectedYearMonth] = useState({
    year: initialDate.getFullYear(),
    month: initialDate.getMonth(),
  });

  const currentDate = useMemo(() => {
    const date = new Date(selectedYearMonth.year, selectedYearMonth.month, selectedDate || 1);
    console.log('Computing currentDate:', selectedYearMonth.year, selectedYearMonth.month, selectedDate, 'Result:', date.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    return isNaN(date) ? new Date() : date; 
  }, [selectedYearMonth.year, selectedYearMonth.month, selectedDate]);

  useEffect(() => {
    if (initialDate && !isNaN(initialDate)) {
      console.log('Syncing initialDate:', initialDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
      setSelectedYearMonth({
        year: initialDate.getFullYear(),
        month: initialDate.getMonth(),
      });
      setSelectedDate(initialDate.getDate());
    }
  }, [initialDate]);

  const updateCurrentDate = useCallback(() => {
    console.log('Updating currentDate:', currentDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    setCurrentDate(currentDate);
  }, [currentDate, setCurrentDate]);

  useEffect(() => {
    if (isMounted.current) {
      updateCurrentDate();
    } else {
      isMounted.current = true;
    }
  }, [updateCurrentDate, selectedYearMonth.year, selectedYearMonth.month, selectedDate]);

  const handleMonthChange = (year, month) => {
    console.log('handleMonthChange called with:', year, month);
    if (year && month >= 0 && month <= 11) {
      setSelectedYearMonth({ year, month });
      setSelectedDate(1);
      updateCurrentDate(); 
    } else {
      console.warn('Invalid year or month:', year, month);
    }
  };

  const handleDateSelect = (day) => {
    console.log('handleDateSelect called with day:', day);
    setSelectedDate(day);
    const newDate = new Date(selectedYearMonth.year, selectedYearMonth.month, day);
    console.log('New date computed:', newDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    if (!isNaN(newDate)) {
      setCurrentDate(newDate);
    }
  };

  const renderCalendar = () => {
    const year = selectedYearMonth.year;
    const month = selectedYearMonth.month;
    console.log('Rendering calendar for:', year, month);
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

  const formatDate = (date,type) => {
    const options = type === "ym" 
    ? { year: 'numeric', month: 'long' }
    : { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="flex items-center justify-between my-8">
      <div className="log-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            <MonthPicker
              currentDate={currentDate}
              onChange={handleMonthChange}
            />
          </h2>
          <div className="date-nav">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleMonthChange(selectedYearMonth.year, selectedYearMonth.month - 1)} />
            <FontAwesomeIcon icon={faCalendarDay} onClick={() => handleMonthChange(new Date().getFullYear(), new Date().getMonth())} />
            <FontAwesomeIcon icon={faArrowRight} onClick={() => handleMonthChange(selectedYearMonth.year, selectedYearMonth.month + 1)} />
          </div>
        </div>
        <div className="card p-4 mb-6">
          <p className="mb-6 text-gray-500">每月待辨事項規劃</p>
          <h1>{formatDate(currentDate,'ymd')}</h1>
        </div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default MonthNavigator;