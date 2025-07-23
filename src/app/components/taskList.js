import React from 'react';

const TaskList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task List</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Finish project proposal</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Buy groceries</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-2" checked readOnly />
          <span>Go to the gym</span>
        </li>
      </ul>
    </div>
  );
};

export default TaskList;