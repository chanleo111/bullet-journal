import React from 'react';
import {faArrowLeft, faArrowRight,faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DayPicker } from './date/datePicker';

const DateNavigator = ({ currentDate, setCurrentDate,onChange}) => {
  console.log('currentDate',currentDate);
  
  const handleDateChange =(newDate) =>{
    console.log('update date:',newDate);
    setCurrentDate(newDate);
    if(onChange){
      onChange(newDate);
    }
  }
  

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  };
  
  return (
    <div className="flex items-center justify-between my-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          <DayPicker 
          currentDate={currentDate} 
          onChange={(selectedDate) =>{
            console.log('dayPicker select date:',selectedDate);
            handleDateChange(selectedDate);
          }}
          />
        </h2>
        <p className="text-gray-500">每日任務、事件和筆記</p>
      </div>
    </div>
  );
};

export default DateNavigator;
