'use client';
import React, { useState, useEffect } from 'react';
import { faArrowLeft, faArrowRight, faCalendarDay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FutureLog = ({ currentDate: initialDate = null, setCurrentDate }) => {
    const [selectedYear, setSelectedYear] = useState(initialDate ? initialDate.getFullYear() : new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(initialDate ? initialDate.getDate() : new Date().getDate());
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTask = (text) => {
    const effectiveDate = new Date(selectedYear, 0, selectedDate); // 默认 1 月 1 日，后续可扩展
    const dateKey = effectiveDate.toLocaleDateString('zh-CN', { timeZone: 'Asia/Hong_Kong' }).split(' ')[0].replace(/\//g, '-');
    console.log('添加任务日期:', dateKey, 'effectiveDate:', effectiveDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    const newItem = { id: Date.now(), text: '.' + text, date: dateKey };
    const newTasks = [...tasks, newItem];
    console.log('添加新項:', newTasks);
    setTasks(newTasks);
    saveData(newTasks);
  };

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

  const removeTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    console.log('刪除後列表:', newTasks);
    setTasks(newTasks);
    saveData(newTasks);
  };

  const toggleTask = (id) => {
    let updated = false;
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        const isCompleted = item.text.startsWith('x');
        const newText = (isCompleted ? '.' : 'x') + (item.text.length > 1 ? item.text.substring(1) : '');
        updated = true;
        return { ...item, text: newText };
      }
      return item;
    });
    if (updated) {
      setTasks(newTasks);
      saveData(newTasks);
    }
  };
    return (
    <div className="card p-4 mt-6">
          <h3 className="font-bold text-lg mb-4">未來任務</h3>
          <div className="space-y-3">
            {tasks
              .filter(task => task.date && new Date(task.date).getFullYear() === selectedYear)
              .map((task) => (
                <div key={task.id} className="flex justify-between items-center">
                  <span
                    className={`cursor-pointer ${task.text.startsWith('x') ? 'line-through' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.text}
                  </span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => removeTask(task.id)}
                  />
                </div>
              ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              value=""
              maxLength={15}
              onChange={(e) => addTask(e.target.value)}
              placeholder=""
              className="flex-grow border rounded px-2 py-1"
            />
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-gray-500 hover:text-green-500"
              onClick={() => addTask(document.querySelector('input').value)}
            />
          </div>
        </div>
        )
    }
export default FutureLog;