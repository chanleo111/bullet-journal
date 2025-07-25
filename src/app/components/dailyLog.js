import React, { useState, useEffect } from 'react';

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
            <button 
              onClick={() => onRemoveItem(item.id)} 
              className="text-red-400 hover:text-red-600 text-xs"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onClick={(e) => e.key ===  handleAddItem()}
          placeholder=""
          className="flex-grow border rounded px-2 py-1"
        />
        <button 
          onClick={handleAddItem} 
          className="px-3 py-1 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

const DailyLog = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data');
        const data = await response.json();
        setTasks(data.tasks || []);
        setEvents(data.events || []);
        setNotes(data.notes || []);
      } catch (error) {
        console.error('load data fail:', error);
      }
    };
    fetchData();
  }, []);

  const saveData = async (updatedData) => {
    try {
      await fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error('save data fail:', error);
    }
  };

  const addItem = (list, setList, type) => (text) => {
    const newList = [...list, { id: Date.now(), text }];
    setList(newList);
    saveData({ tasks, events, notes, [type]: newList });
  };

  const removeItem = (list, setList, type) => (id) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    saveData({ tasks, events, notes, [type]: newList });
  };

  const toggleItem = (list, setList, type) => (id) => {
    const newList = list.map(item => {
      if (item.id === id) {
        const isCompleted = item.text.startsWith('x');
        console.log('type:'+type);
        switch(type){
        case "tasks":
           return {
          ...item,
          text: isCompleted ? '.' + item.text.substring(1) : 'x' + item.text.substring(1)
          };
          break;
        
        case "events" :
          return {
          ...item,
          text: isCompleted ? '○' + item.text.substring(1) : 'x' + item.text.substring(1)
          };
          
        default:
          return {
          ...item,
          text: isCompleted ? '-' + item.text.substring(1) : 'x' + item.text.substring(1)
          };
      }
      }
      return item;
    });
    setList(newList);
    saveData({ tasks, events, notes, [type]: newList });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        title="待辨事項" 
        icon={<span className="mr-2 text-xl">•</span>} 
        items={tasks} 
        onAddItem={addItem(tasks, setTasks, 'tasks')} 
        onRemoveItem={removeItem(tasks, setTasks, 'tasks')}
        onToggleItem={toggleItem(tasks, setTasks, 'tasks')}
      />
      <Card 
        title="事件" 
        icon={<span className="mr-2 text-xl">○</span>} 
        items={events} 
        onAddItem={addItem(events, setEvents, 'events')} 
        onRemoveItem={removeItem(events, setEvents, 'events')}
        onToggleItem={toggleItem(events, setEvents, 'events')}
      />
      <Card 
        title="想法" 
        icon={<span className="mr-2 text-xl">—</span>} 
        items={notes} 
        onAddItem={addItem(notes, setNotes, 'notes')} 
        onRemoveItem={removeItem(notes, setNotes, 'notes')}
        onToggleItem={toggleItem(notes, setNotes, 'notes')}
      />
    </div>
  );
};

export default DailyLog;