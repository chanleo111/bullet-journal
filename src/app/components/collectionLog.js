import React, { useState } from 'react';

const CollectionLog = () => {
    const [collections, setCollections] = useState([{ id: 1, title: 'Project Ideas', tasks: [] }]);
    const [newTaskText, setNewTaskText] = useState({});

    const addCollection = () => {
        const title = prompt('Enter new collection title:');
        if (title) {
            setCollections([...collections, { id: new Date().getTime(), title, tasks: [] }]);
        }
    };

    const removeCollection = (id) => {
        setCollections(collections.filter(c => c.id !== id));
    };
    
    const handleTaskInputChange = (collectionId, text) => {
        setNewTaskText({ ...newTaskText, [collectionId]: text });
    };

    const addTask = (collectionId) => {
        const taskText = newTaskText[collectionId];
        if (!taskText || taskText.trim() === '') return;

        const updatedCollections = collections.map(c => {
            if (c.id === collectionId) {
                const newTask = { id: new Date().getTime(), text: taskText };
                return { ...c, tasks: [...c.tasks, newTask] };
            }
            return c;
        });

        setCollections(updatedCollections);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">主題頁 (Collections)</h2>
                <button
                    onClick={addCollection}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600"
                >
                    新增主題
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(col => (
                    <div key={col.id} className="bg-white rounded-lg shadow p-6 relative">
                        <h3 className="font-semibold text-gray-700 mb-4">{col.title}</h3>
                        <p className="text-gray-500">Content for this collection goes here.</p>
                        <button
                            onClick={() => removeCollection(col.id)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                        >
                            &#x2715;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionLog;