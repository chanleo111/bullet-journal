import { Chatbot as ChatbotKit } from 'react-chatbot-kit';
import config from '../chatbot/config';
import MessageParser from '../chatbot/messageParser';
import ActionProvider from '../chatbot/actionProvider';

const Chatbot = () => {
  return <div>
      <ChatbotKit
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      </div>
    
};

export default Chatbot;