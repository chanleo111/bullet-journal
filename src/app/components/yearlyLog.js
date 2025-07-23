import React, { useState } from 'react';

const YearlyLog = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    const handlePreviousYear = () => {
        setCurrentYear(currentYear - 1);
    };

    const handleNextYear = () => {
        setCurrentYear(currentYear + 1);
    };

    const addGoal = () => {
        if (newGoal.trim()) {
            setGoals([...goals, { id: Date.now(), text: newGoal }]);
            setNewGoal('');
        }
    };

    const removeGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{currentYear}</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={handlePreviousYear} className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100">&lt;</button>
                    <button onClick={handleNextYear} className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100">&gt;</button>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="New yearly goal..."
                        className="flex-grow border rounded px-3 py-2"
                    />
                    <button onClick={addGoal} className="px-4 py-2 bg-purple-500 text-white rounded shadow-sm hover:bg-purple-600">Add Goal</button>
                </div>
                <div className="space-y-2">
                    {goals.map(goal => (
                        <div key={goal.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span>{goal.text}</span>
                            <button onClick={() => removeGoal(goal.id)} className="text-red-400 hover:text-red-600">X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YearlyLog;