import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleIntroduction = () => {
    const botMessage = createChatBotMessage
    ('子彈筆記是將工作系統化的歸納，「任務清單、計畫行程表、傳統式日記」三種要素構成。這套筆記術能讓你釐清目前的狀態，更專注手邊執行的任務，對於時常感到工作混亂、不清楚任務輕重緩急的人非常受用。');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleIntroduction,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;