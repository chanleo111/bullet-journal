"use client";
import React, { useState, useMemo } from 'react';
import BulletItem from './bulletItem';
import isEqual from 'lodash/isEqual'; 

const MonthlyLog = ({ 
  entries: initialEntries = [], 
  onAddEntry = () => {}, 
  onUpdateEntry = () => {}, 
  onDeleteEntry = () => {} 
}) => {
  const entries = useMemo(() => {
    return Array.isArray(initialEntries) ? initialEntries : [];
  }, [initialEntries]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [newItemText, setNewItemText] = useState('');
  const [newItemType, setNewItemType] = useState('task');

  const handlePreviousMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setSelectedDate(1);
  };

  const handleNextMonthly = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setSelectedDate(1);
  };

  const formatDate = (date) => {
    try {
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('zh-CN', options);
    } catch {
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        selectedDate
      ).toISOString(),
      text: newItemText,
      type: newItemType,
      completed: false
    };

    onAddEntry(newEntry);
    setNewItemText('');
  };

  const handleToggleComplete = (id) => {
    const updatedEntries = entries.map(entry => {
      if (entry.id === id) {
        return { ...entry, completed: !entry.completed };
      }
      return entry;
    });
    onUpdateEntry(updatedEntries);
  };

  const handleDeleteItem = (id) => {
    onDeleteEntry(id);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

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
      const dayEntries = entries.filter(entry => {
        try {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === year &&
            entryDate.getMonth() === month &&
            entryDate.getDate() === day
          );
        } catch {
          return false;
        }
      });

      const isToday = (
        day === today && 
        month === currentMonth && 
        year === currentYear
      );

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day 
            ${isToday ? 'today' : ''} 
            ${day === selectedDate ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          <div className="day-number">{day}</div>
          {dayEntries.length > 0 && (
            <div className="day-indicator">
              {dayEntries.filter(e => !e.completed).length > 0 && (
                <span className="pending-indicator"></span>
              )}
            </div>
          )}
        </div>
      );
    }

    return <div className="calendar-grid">{calendarDays}</div>;
  };

  // 获取选中日期的項目
  const selectedEntries = useMemo(() => {
    return entries.filter(entry => {
      if (!entry?.date) return false;
      
      try {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === currentDate.getFullYear() &&
          entryDate.getMonth() === currentDate.getMonth() &&
          entryDate.getDate() === selectedDate
        );
      } catch {
        return false;
      }
    });
  }, [entries, currentDate, selectedDate]);

  return (
    <div className="log-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{formatDate(currentDate)}</h2>
        <div className="date-nav">
          <button 
            onClick={handlePreviousMonthly}
            className="px-3 py-1 bg-gray-200 rounded mr-2 hover:bg-gray-300"
          >
            &lt;
          </button>
          <button 
            onClick={handleNextMonthly}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
      <p className="mb-6 text-gray-500">月度概覽和事項規劃</p>
      
      <div className="card p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">日歷</h3>
        {renderCalendar()}
      </div>

      <div className="card p-4">
        <h3 className="font-bold text-lg mb-4">
          {selectedDate}日事項
        </h3>
        
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <button
              className={`px-3 py-1 rounded transition-colors ${
                newItemType === 'task' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setNewItemType('task')}
            >
              待辨事項
            </button>
            <button
              className={`px-3 py-1 rounded transition-colors ${
                newItemType === 'event' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setNewItemType('event')}
            >
              事件
            </button>
            <button
              className={`px-3 py-1 rounded transition-colors ${
                newItemType === 'note' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setNewItemType('note')}
            >
              想法
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder={`新增${newItemType === 'task' ? '待辨事項' : newItemType === 'event' ? '事件' : '想法'}...`}
              className="flex-grow border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <button
              onClick={handleAddItem}
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={!newItemText.trim()}
            >
              增加
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          {selectedEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">今天無事項</p>
          ) : (
            selectedEntries.map(item => (
              <BulletItem
                key={item.id}
                item={item}
                onToggleComplete={() => handleToggleComplete(item.id)}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyLog;