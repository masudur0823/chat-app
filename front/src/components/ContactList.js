import React, { useState, useRef, useEffect } from 'react';
import { TextField, Divider, Badge, Avatar } from '@mui/material';

function ContactList({ setSelectedContactId, selectedContactId, contacts , setContacts, isLoading, loadMoreContacts }) {

  //console.log('contacts list', contacts)
  const [searchTerm, setSearchTerm] = useState("");
  //console.log("contacts " +JSON.stringify(contacts) )
  const safeContacts = contacts || [];
  const threshold = 10;

  const contactListRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + threshold && !isLoading) {
          loadMoreContacts();
          console.log("jalo mas");
        }
    };

    const listElem = contactListRef.current;
    if (listElem) {
      listElem.addEventListener('scroll', handleScroll);
      return () => listElem.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, loadMoreContacts]);


  const filteredContacts = safeContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contactId) => {
    const updatedContacts = safeContacts.map(contact => {
      if (contact.id === contactId) {
        return { ...contact, unreadCount: 0 };
      }
      return contact;
    });
  
    // This assumes you'll pass a prop named setContacts from the parent Chat component
    setContacts(updatedContacts);
  }

  return (
    <div 
    ref={contactListRef}
    style={{ width: '20%', borderRight: '1px solid black', padding: '20px', overflowY: 'auto', height: '100vh' }}
>
      <TextField 
        variant="outlined" 
        label="Search contacts" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <Divider style={{ marginBottom: '20px' }}/> 
      {filteredContacts.map((contact, index) => {
        return (
          <div
            key={contact.id}
            onClick={() => {
              setSelectedContactId(contact.id);
              handleContactClick(contact.id);
            }}
            style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: contact.id === selectedContactId ? 'lightgray' : index % 2 === 0 ? 'lightblue' : 'white',
              display: 'flex',
              alignItems: 'center',
              minHeight: '70px',
              position: 'relative'
            }}
          >
            <Avatar>{contact.name[0].toUpperCase()}</Avatar>
            <div style={{ marginLeft: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{margin: 0, fontSize: '1em'}}>{contact.name}</h3>
                <p style={{margin: 0, fontSize: '0.8em'}}>{contact.lastMessage.substring(0, 30)}</p>
              </div>
              <p style={{margin: 0, fontSize: '0.7em'}}>
                {/* {contact.lastMessageDate && new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',s
                  month: 'long',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(contact.lastMessageDate)} */}
              </p>
            </div>
            
            {contact.unreadCount > 0  && (
              <Badge badgeContent={contact.unreadCount} color="primary" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <span></span>  
              </Badge>
            )}
          </div>
        );
      })}
        {isLoading && <div>Loading more contacts...</div>}
    </div>
  );
}

export default ContactList;
