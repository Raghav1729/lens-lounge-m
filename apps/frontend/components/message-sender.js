import React, { useState } from 'react';
import { sendMessage } from '../services/apiService';

const MessageSender = () => {
  const [queue, setQueue] = useState('');
  const [content, setContent] = useState('');

  const handleSend = async () => {
    await sendMessage(queue, content);
    alert('Message sent');
  };

  return (
    <div>
      <input
        type="text"
        value={queue}
        onChange={(e) => setQueue(e.target.value)}
        placeholder="Queue name"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message content"
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default MessageSender;
