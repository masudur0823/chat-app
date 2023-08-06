import { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
    //console.log("Contex " + contacts);
  const updateContactWithNewMessage = (message) => {
    setContacts((prevContacts) => {
      // Find and update the contact, then sort by lastMessageDate
      let updatedContacts = prevContacts.map(contact => {
        if (contact.id === message.contactId) {
          contact.lastMessage = message.text;
          contact.lastMessageDate = message.createdAt; // assuming the message has a 'createdAt' date
          contact.unreadCount = (contact.unreadCount || 0) + 1; // increment unread messages count
        }
        return contact;
      });
      return updatedContacts.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));
    });
  };

  return (
    <ContactContext.Provider value={{ contacts, setContacts, updateContactWithNewMessage }}>
      {children}
    </ContactContext.Provider>
  );
};
