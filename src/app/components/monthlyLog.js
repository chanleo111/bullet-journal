"use client";
import React, { useState, useMemo } from 'react';
import {faArrowLeft, faArrowRight,faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
const Card = ({ title, icon, items, onAddItem, onRemoveItem, onToggleItem }) => {
  const [newItem, setNewItem] = useState('');
  const handleAddItem = () => {
    if (newItem.trim()) {
      switch(title){
        case "待辨事項":
          onAddItem('.' + newItem );
          break;
        
        case "事件" :
          onAddItem('○' + newItem);
          break;
        default:
          onAddItem('-' + newItem);
          break;
      }
      setNewItem('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="space-y-3 text-gray-600 flex-grow">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <span 
              className={`cursor-pointer ${item.text.startsWith('x') ? '' : ''}`}
              onClick={() => onToggleItem(item.id)}
            >
              {item.text}
            </span> 
             <FontAwesomeIcon icon={faTrash} onClick={() => onRemoveItem(item.id)} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newItem}
          maxLength={15}
          onChange={(e) => setNewItem(e.target.value)}
          onClick={(e) => e.key ===  handleAddItem()}
          placeholder=""
          className="flex-grow border rounded px-2 py-1"
        />
          <FontAwesomeIcon icon={faPlus} onClick={handleAddItem} />
      </div>
    </div>
  );
};
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
          <FontAwesomeIcon icon={faArrowLeft} onClick={handlePreviousMonthly} />
          <FontAwesomeIcon icon={faArrowRight} onClick={handleNextMonthly} />
        </div>
      </div>
      <p className="mb-6 text-gray-500">每月待辨事項規劃</p>
      
      <div className="card p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">日歷</h3>
        {renderCalendar()}
      </div>

      <div className="card p-4">
        <h3 className="font-bold text-lg mb-4">
          {selectedDate}日事項
        </h3>
        
       
        </div>
        
        
      </div>
  );
};



export default MonthlyLog;