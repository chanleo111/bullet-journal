import React, { useState, useEffect } from 'react';
import { faArrowLeft, faArrowRight, faCalendarDay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const futureNavigator = ({ currentDate: initialDate = null, setCurrentDate }) => {
  const [selectedYear, setSelectedYear] = useState(initialDate ? initialDate.getFullYear() : new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(initialDate ? initialDate.getDate() : new Date().getDate());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/data');
      if (!response.ok) {
        throw new Error(`load data fail: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('load data:', data);
      setTasks(data.tasks || []);
      setError(null);
    } catch (error) {
      console.error('data load fail:', error);
      setError(error.message || 'can not connect');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const saveData = async (updatedTasks) => {
    try {
      console.log('保存數據:', { tasks: updatedTasks });
      const response = await fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: updatedTasks, events: [], notes: [] }),
      });
      if (!response.ok) {
        throw new Error(`數據保存失敗: ${response.statusText}`);
      }
      console.log('保存成功');
      await fetchData();
    } catch (error) {
      console.error('數據保存失敗:', error);
      setError(error.message || '無法保存數據，請檢查後端服務');
    }
  };

  

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const handleDateSelect = (month, day) => {
    const newDate = new Date(selectedYear, month, day);
    setSelectedDate(day);
    setCurrentDate(newDate);
    console.log('Selected Date:', newDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
  };

  const renderCalendar = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);
    const daysInMonth = months.map(m => new Date(selectedYear, m + 1, 0).getDate());
    const firstDays = months.map(m => new Date(selectedYear, m, 1).getDay());
    const calendar = [];

    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    months.forEach((month, mIndex) => {
      calendar.push(<h3 key={`month-${month}`} className="font-bold text-lg mt-4">{new Date(selectedYear, month, 1).toLocaleDateString('zh-CN', { month: 'long' })}</h3>);
      weekdays.forEach(day => {
        calendar.push(
          <div key={`weekday-${month}-${day}`} className="calendar-weekday">
            {day}
          </div>
        );
      });

      for (let i = 0; i < firstDays[mIndex]; i++) {
        calendar.push(<div key={`empty-${month}-${i}`} className="calendar-day empty"></div>);
      }

      for (let day = 1; day <= daysInMonth[mIndex]; day++) {
        const isToday = (
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          selectedYear === new Date().getFullYear()
        );
        calendar.push(
          <div
            key={`${month}-${day}`}
            className={`calendar-day ${isToday ? 'today' : ''} ${day === selectedDate ? 'selected' : ''}`}
            onClick={() => handleDateSelect(month, day)}
          >
            <div className="day-number">{day}</div>
          </div>
        );
      }
    });

    return <div className="calendar-grid">{calendar}</div>;
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div className="text-red-500 p-4 border border-red-500">error:{error}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between my-8">
        <h2 className="text-3xl font-bold text-gray-800">{selectedYear}年</h2>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handlePreviousYear} />
          <FontAwesomeIcon icon={faCalendarDay} onClick={() => setSelectedYear(new Date().getFullYear())} />
          <FontAwesomeIcon icon={faArrowRight} onClick={handleNextYear} />
        </div>
      </div>
      <div className="log-container">
        {renderCalendar()}
        
      </div>
    </div>
  );
};

export default futureNavigator;