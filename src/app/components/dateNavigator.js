import React from 'react';

const DateNavigator = ({ currentDate, setCurrentDate }) => {
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    console.log('date:'+date);
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="flex items-center justify-between my-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{formatDate(currentDate)}</h2>
        <p className="text-gray-500">每日任務、事件和筆記</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handlePreviousDay} className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100">&lt;</button>
        <button onClick={handleToday} className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700">今天</button>
        <button onClick={handleNextDay} className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100">&gt;</button>
      </div>
    </div>
  );
};

export default DateNavigator;
