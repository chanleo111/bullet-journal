import { useState, useEffect } from "react";

export const MonthPicker = ({ currentDate, onChange }) => {
  const [year, setYear] = useState(currentDate ? currentDate.getFullYear() : new Date().getFullYear());
  const [month, setMonth] = useState(currentDate ? currentDate.getMonth() : new Date().getMonth());

  useEffect(() => {
    if (currentDate && !isNaN(currentDate)) {
      const newYear = currentDate.getFullYear();
      const newMonth = currentDate.getMonth();
      console.log('Updating MonthPicker with:', currentDate.toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
      if (year !== newYear || month !== newMonth) {
        setYear(newYear);
        setMonth(newMonth);
        onChange(newYear, newMonth);
      }
    }
  }, [currentDate, onChange]);

  const handleChange = (newYear, newMonth) => {
    if (newYear && newMonth >= 0 && newMonth <= 11) {
      setYear(newYear);
      setMonth(newMonth);
      onChange(newYear, newMonth);
      console.log('New date selected:', new Date(newYear, newMonth, 1).toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' }));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        <select
          value={year}
          onChange={(e) => {
            const newYear = parseInt(e.target.value);
            if (!isNaN(newYear)) {
              handleChange(newYear, month);
            }
          }}
          className="border rounded px-3 py-1"
        >
          {Array.from({ length: 6 }, (_, i) => {
            const currentYear = new Date().getFullYear();
            const year = currentYear + i;
            return (
              <option key={year} value={year}>{year}年</option>
            );
          })}
        </select>

        <select
          value={month + 1} 
          onChange={(e) => {
            const newMonth = parseInt(e.target.value) - 1;
            if (!isNaN(newMonth) && newMonth >= 0 && newMonth <= 11) {
              handleChange(year, newMonth);
            }
          }}
          className="border rounded px-3 py-1"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}月</option>
          ))}
        </select>
      </div>
    </div>
  );
};