import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log('message:'+message);
    if(message.includes('甚麼是子彈筆記')){
      actions.handleIntroduction();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;