import React, { useState, useEffect,useContext  } from 'react';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import ContactDetails from '../components/ContactDetails';
import http from '../utils/http';
import { SocketContext } from '../context/SocketContext';



function Chat() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  console.log('contacts', contacts) 
  const socket = useContext(SocketContext);

  const sortContacts = (contactsArray) => {
    return contactsArray.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));
  };

  useEffect(() => {
    if(!socket) return null

    socket.on('new message', newMessage => {
      console.log('newMessage', newMessage)
      /* if (newMessage.contactId === selectedContactId) {
        const updatedContacts = contacts.map(c => {
          if (c.id === newMessage.contactId) {
            return {
              ...c, 
              lastMessage: newMessage.text,
              lastMessageDate: newMessage.createdAt,
              // unreadCount: c.id === selectedContactId ? c.unreadCount : c.unreadCount + 1,
              unreadCount: c.unreadCount + 1
            };
          }
          return c;
        }); */



        const updatedContacts = contacts.map(c => {
          if (c.id === newMessage.contactId) {
            return {
              ...c,
              lastMessage: newMessage.text,
              lastMessageDate: newMessage.createdAt,
              // unreadCount: c.id === selectedContactId ? c.unreadCount : c.unreadCount + 1,
              unreadCount: isNaN(Number(c.unreadCount)) ? 1 : Number(c.unreadCount) + 1
            };
          }
          return c;
        });

        console.log('updatedContacts', updatedContacts)
        setContacts(sortContacts(updatedContacts));
    });

    return () => {
      socket.off('new message');
    };
  }, [selectedContactId, socket, contacts]);


  const fetchContacts = (page) => {
    setIsLoading(true);
    http.get('/contacts', { params: { page } })
      .then(response => {
        const newContacts = response.data.contacts.map(contact => ({
          first_name:contact.first_name,
          last_name:contact.last_name,
          email:contact.email,
          phone:contact.tel,
          amount:contact.amount,
          id: contact.id,
          name: `${contact.first_name} ${contact.last_name}`,
          lastMessage: contact.messages[0]?.text || '',
          lastMessageDate: contact.messages[0]?.createdDate ? new Date(contact.messages[0].createdDate) : null,
          unreadCount:contact?.unreadCount,
        }))
        if (page === 1) {
          setContacts(newContacts);
        } else {
          setContacts(prevContacts => [...prevContacts, ...newContacts]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Add this code block
        if (error.response && error.response.status === 403) {
          alert("Your subscription is not valid");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
      fetchContacts(currentPage);
  }, [currentPage]);


  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);
  const messages = selectedContact ? selectedContact.messages : [];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ContactList 
      contacts={contacts} 
      setSelectedContactId={setSelectedContactId} 
      selectedContactId={selectedContactId}  
      setContacts={setContacts}  
      unreadCount={selectedContact ? selectedContact.unreadCount : 0}  
      isLoading={isLoading}
      loadMoreContacts={() => setCurrentPage(prev => prev + 1)}
      />
      {selectedContact && <ChatContainer contact={selectedContact} messages={messages}   setContacts={setContacts}/>}
      {selectedContact && <ContactDetails contact={selectedContact} />}

    </div>
  );
}

export default Chat;
