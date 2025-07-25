import React from 'react';
import {faArrowLeft, faArrowRight,faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    setCurrentDate(useDate());
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="flex items-center justify-between my-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{formatDate(currentDate)}</h2>
        <p className="text-gray-500">每日任務、事件和筆記</p>
      </div>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handlePreviousDay} />
        <FontAwesomeIcon icon ={faCalendarDay} onClick={handleToday} />
        <FontAwesomeIcon icon={faArrowRight} onClick={handleNextDay} />
      </div>
    </div>
  );
};

export default DateNavigator;
