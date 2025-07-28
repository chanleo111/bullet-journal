'use client';
import React, { useState, useEffect } from 'react';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ title, icon, items, onAddItem, onRemoveItem, onToggleItem }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      switch (title) {
        case '待辨事項':
          onAddItem('.' + newItem);
          break;
        case '事件':
          onAddItem('○' + newItem);
          break;
        case '想法':
          onAddItem('-' + newItem);
          break;
        default:
          console.error('not vaild title:', title);
          return;
      }
      setNewItem('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="space-y-3 text-gray-600 flex-grow">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span
              className={`cursor-pointer ${item.text && item.text.startsWith('x') ? 'line-through' : ''}`}
              onClick={() => {
                console.log('change id:', item.id, 'text:', item.text); 
                onToggleItem(item.id);
              }}
            >
              {item.text || 'not vaild'}
            </span>
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => onRemoveItem(item.id)}
            />
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500"></p>}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newItem}
          maxLength={15}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder=""
          className="flex-grow border rounded px-2 py-1"
        />
        <FontAwesomeIcon
          icon={faPlus}
          className="cursor-pointer text-gray-500 hover:text-green-500"
          onClick={handleAddItem}
        />
      </div>
    </div>
  );
};

const DailyLog = ({ currentDate }) => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/data');
      if (!response.ok) {
        throw new Error(`save data fail: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('load data:', data); 
      setTasks(data.tasks || []);
      setEvents(data.events || []);
      setNotes(data.notes || []);
      setError(null);
    } catch (error) {
      console.error('save data fail:', error);
      setError(error.message || 'save data fail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  const saveData = async (updatedData) => {
    try {
      console.log('save data:', updatedData); 
      const response = await fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`save data fail: ${response.statusText}`);
      }
      console.log('save success'); 
      await fetchData(); // 刷新数据
    } catch (error) {
      console.error('save data fail:', error);
      setError(error.message || 'save data fail');
    }
  };

  const addItem = (list, setList, type) => (text) => {
    const dateKey = currentDate.toISOString().split('T')[0];
    const newItem = { id: Date.now(), text, date: dateKey };
    const newList = [...list, newItem];
    console.log('new item:', newList); 
    setList(newList);
    saveData({
      tasks: type === 'tasks' ? newList : tasks,
      events: type === 'events' ? newList : events,
      notes: type === 'notes' ? newList : notes,
    });
  };

  const removeItem = (list, setList, type) => (id) => {
    const newList = list.filter((item) => item.id !== id);
    console.log('删除后列表:', newList); 
    setList(newList);
    saveData({
      tasks: type === 'tasks' ? newList : tasks,
      events: type === 'events' ? newList : events,
      notes: type === 'notes' ? newList : notes,
    });
  };

  const prefixMap = {
    tasks: (isCompleted) => (isCompleted ? 'x' : '.'),
    events: (isCompleted) => (isCompleted ? 'x' : '○'),
    notes: (isCompleted) => (isCompleted ? 'x' : '-'),
  };

  const toggleItem = (list, setList, type) => (id) => {
    console.log('Toggle called with id:', id, 'type:', type, 'list:', list); 
    let updated = false;
    const newList = list.map((item) => {
      if (item.id === id) {
        console.log('change item:', type, item); 
        const isCompleted = item.text && item.text.startsWith('x');
        console.log('isCompleted:', isCompleted); 
        const getPrefix = prefixMap[type];
        if (!getPrefix) {
          console.error('not vaild type:', type);
          return item;
        }
        const newPrefix = getPrefix(!isCompleted);
        console.log('new prefix:', newPrefix); 
        const newText = newPrefix + (item.text && item.text.length > 1 ? item.text.substring(1) : '');
        console.log('new text:', newText); 
        updated = true;
        return {
          ...item,
          text: newText,
        };
      }
      return item;
    });
    console.log('切换后列表:', newList); 
    console.log('是否更新:', updated); 
    if (updated) {
      setList([...newList]); 
      saveData({
        tasks: type === 'tasks' ? newList : tasks,
        events: type === 'events' ? newList : events,
        notes: type === 'notes' ? newList : notes,
      });
    } else {
      console.warn('not find id:', id);
    }
  };

  const filterByDate = (items) =>
    items.filter(
      (item) =>
        item.date &&
        new Date(item.date).toDateString() === currentDate.toDateString()
    );

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500 p-4 border border-red-500">错误：{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 card-grid">
      <Card
        title="待辨事項"
        icon={<span className="mr-2 text-xl">•</span>}
        items={filterByDate(tasks)}
        onAddItem={addItem(tasks, setTasks, 'tasks')}
        onRemoveItem={removeItem(tasks, setTasks, 'tasks')}
        onToggleItem={toggleItem(tasks, setTasks, 'tasks')}
      />
      <Card
        title="事件"
        icon={<span className="mr-2 text-xl">○</span>}
        items={filterByDate(events)}
        onAddItem={addItem(events, setEvents, 'events')}
        onRemoveItem={removeItem(events, setEvents, 'events')}
        onToggleItem={toggleItem(events, setEvents, 'events')}
      />
      <Card
        title="想法"
        icon={<span className="mr-2 text-xl">—</span>}
        items={filterByDate(notes)}
        onAddItem={addItem(notes, setNotes, 'notes')}
        onRemoveItem={removeItem(notes, setNotes, 'notes')}
        onToggleItem={toggleItem(notes, setNotes, 'notes')}
      />
    </div>
  );
};

export default DailyLog;