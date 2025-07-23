import React from 'react';

const BulletItem = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'task':
        return '•'; 
      case 'event':
        return '○'; 
      case 'note':
        return '–'; 
      default:
        return '•';
    }
  };

  return (
    <div className="bullet-item">
      <span className="icon">{getIcon()}</span>
      <span>{item.content}</span>
    </div>
  );
};

export default BulletItem;
