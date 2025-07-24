import React, { useState } from 'react';

const Card = ({ title, icon, items, onAddItem, onRemoveItem, onToggleItem }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem('.' + newItem); // 新項目以 . 開頭
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
              className={`cursor-pointer ${item.text.startsWith('x') }`}
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
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          placeholder="New item..."
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

  const addItem = (list, setList) => (text) => {
    setList([...list, { id: Date.now(), text }]);
  };

  const removeItem = (list, setList) => (id) => {
    setList(list.filter(item => item.id !== id));
  };

  const toggleItem = (list, setList) => (id) => {
    setList(list.map(item => {
      if (item.id === id) {
        const isCompleted = item.text.startsWith('x');
        return {
          ...item,
          text: isCompleted ? '.' + item.text.substring(1) : 'x' + item.text.substring(1)
        };
      }
      return item;
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        title="任務" 
        icon={<span className="mr-2 text-xl">•</span>} 
        items={tasks} 
        onAddItem={addItem(tasks, setTasks)} 
        onRemoveItem={removeItem(tasks, setTasks)}
        onToggleItem={toggleItem(tasks, setTasks)}
      />
      <Card 
        title="事件" 
        icon={<span className="mr-2 text-xl">○</span>} 
        items={events} 
        onAddItem={addItem(events, setEvents)} 
        onRemoveItem={removeItem(events, setEvents)}
        onToggleItem={toggleItem(events, setEvents)}
      />
      <Card 
        title="筆記" 
        icon={<span className="mr-2 text-xl">—</span>} 
        items={notes} 
        onAddItem={addItem(notes, setNotes)} 
        onRemoveItem={removeItem(notes, setNotes)}
        onToggleItem={toggleItem(notes, setNotes)}
      />
    </div>
  );
};

export default DailyLog;