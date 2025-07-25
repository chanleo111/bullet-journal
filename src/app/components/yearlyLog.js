import React, { useState } from 'react';
import {faPlus, faTrash,faArrowLeft, faArrowRight,faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handlePreviousYear} />
                    <FontAwesomeIcon icon={faArrowRight} onClick={handleNextYear} />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder=""
                        className="flex-grow border rounded px-3 py-2"
                    />
                    <FontAwesomeIcon icon={faPlus} onClick={() => addGoal} />
                </div>
                <div className="space-y-2">
                    {goals.map(goal => (
                        <div key={goal.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span>{goal.text}</span>
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeGoal(goal.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YearlyLog;