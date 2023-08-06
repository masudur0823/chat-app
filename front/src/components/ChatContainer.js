import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import http from '../utils/http';
import { formatDate } from '../helpers/dateHelpers';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function ChatContainer({ contact }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;

    if (scrollTop === 0 && !isLoading) {
      fetchMoreMessages();
    }
  };

  const fetchMoreMessages = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);

    http
      .get(`/messages/${contact.id}`, { params: { page } })
      .then((response) => {
        const messagesData = response.data.map((msg) => ({
          ...msg,
          incoming: msg.incoming ?? true,
        }));
        setMessages((prevMessages) => [...messagesData, ...prevMessages]);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    http
      .get(`/messages/${contact.id}`)
      .then((response) => {
        const messagesData = response.data.map((msg) => ({
          ...msg,
          incoming: msg.incoming ?? true,
        }));
        setMessages(messagesData);
      })
      .catch((error) => console.error('Error:', error));
  }, [contact.id]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    http
      .post('/messages', {
        text: message,
        incoming: false,
        contactId: contact.id,
        channel: contact.channel,
      })
      .then(() => {
        setMessages([
          ...messages,
          { text: message, incoming: false, createdAt: new Date() },
        ]);
      })
      .catch((error) => {
        console.error('Error:', error);

        if (error.response && error.response.status === 403) {
          alert('Your subscription is not valid');
        }
      });

    setMessage('');
  };

  const handleSendFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Specify the file types you want to allow
    
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      
      formData.append('file', file);
      formData.append('contactId', contact.id);
      formData.append('channel', contact.channel);
  
      http.post('/messages/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        // Handle success
        console.log('File sent successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
  
    fileInput.click();
  };
  

  const addEmoji = (emojiObj) => {
    const emoji = emojiObj.native;
    setMessage((message) => message + emoji);
  };

  return (
    <div
      style={{
        width: '80%',
        padding: '10px',
        paddingRight: '20px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar>{contact.name[0].toUpperCase()}</Avatar>
        <h2 style={{ marginLeft: '10px' }}>{contact.name}</h2>
      </div>
      <hr />
      <div
        ref={messagesContainerRef}
        style={{ flexGrow: 0.8, overflowY: 'auto' }}
      >
        {messages.map((msg, index) => (
          <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.incoming ? 'flex-start' : 'flex-end',
            margin: '10px 0',
          }}
        >
          {/* Display the date above the message */}
          <span
            style={{
              fontSize: '0.8em',
              color: '#a5a5a5',
              marginBottom: '5px',
            }}
          >
            {formatDate(msg.createdAt)}
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: msg.incoming ? 'row' : 'row-reverse',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <Avatar>{contact.name[0].toUpperCase()}</Avatar>
            <div
    style={{
      marginLeft: msg.incoming ? '10px' : '0',
      marginRight: msg.incoming ? '0' : '10px',
      backgroundColor: msg.incoming ? '#1877f2' : '#e4e6eb',
      color: msg.incoming ? '#ffffff' : '#050505',
      borderRadius: '20px',
      padding: '5px 10px',
      maxWidth: '70%',
      wordBreak: 'break-word',
    }}
  >
    {msg.incoming && (
      <p
        style={{ fontSize: '0.8em', marginBottom: '2px', marginTop: '0' }}
      >
        <b>{contact.name}</b>
      </p>
    )}
    {/* Check if the message type is image */}
    {msg.type === 'image' ? (
      <a href={`http://localhost:3000${msg.text}`} target="_blank" rel="noopener noreferrer">
        <img 
    src={`http://localhost:3000${msg.text}`} 
    alt="sent content" 
    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px', cursor: 'pointer' }} 
    onClick={() => window.open(`http://localhost:3000${msg.text}`, '_blank')}
/>
      </a>
    ) : (
      <p style={{ margin: '0' }}>{msg.text}</p>
    )}
  </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Add the emoji button here */}
      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <span role="img" aria-label="emoji">
          😀
        </span>
      </IconButton>

      {showEmojiPicker && <Picker data={data} onEmojiSelect={addEmoji} />}

      <IconButton onClick={handleSendFile}>
        <AttachFileIcon />
      </IconButton>

      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        style={{ flexGrow: 1, marginRight: '10px' }}
      />
      <IconButton onClick={handleSendMessage} disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </div>
  </div>
);
}

export default ChatContainer;