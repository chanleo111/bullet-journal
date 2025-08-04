"use client";
import React from 'react';
export const MonthDropdown = ({ currentDate, onChange }) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <select
      value={currentDate.getMonth() + 1}
      onChange={(e) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(parseInt(e.target.value) - 1);
        onChange(newDate);
      }}
      className="border rounded px-3 py-2 bg-white shadow-sm"
    >
      {months.map(month => (
        <option key={month} value={month}>
          {month}月
        </option>
      ))}
    </select>
  );
};

export const YearDropdown = ({ currentDate, onChange }) => {
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  return (
    <select
      value={currentYear}
      onChange={(e) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(parseInt(e.target.value));
        onChange(newDate);
      }}
      className="border rounded px-2 py-1"
    >
      {years.map(year => (
        <option key={year} value={year}>
          {year}年
        </option>
      ))}
    </select>
  );
};

export const DayPicker = ({ currentDate, onChange }) => {
  const toInputFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const dayPickerDate = new Date(currentDate);

  const parseInputDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  const normalizeDate = (date) =>{
    if(date instanceof Date){
        return date;
    }
    if(typeof date === 'string'){
        if(date.includes('GMT')){
            return new Date(date);
        }else{
            const [year, month ,day] = date.split('-').map(Number);
            return new Date(year,month -1,day);
        }
    }
  }
  console.log('datePicker date:',dayPickerDate);
  
   return (
    <input
      type="date"
      value={toInputFormat(dayPickerDate)}
      onChange={(e) => {
        const selectedDate = e.target.value;
        const [year, month, day] = selectedDate.split('-').map(Number);
        const newDate = new Date(year, month - 1, day);
        console.log('selected date:',selectedDate);
        if(!isNaN(newDate.getTime())){
            onChange(newDate);
        }else{
            console.log('date selected', e.target.value);
        }
        }}
      className="border rounded px-2 py-1"
    />
  );
};