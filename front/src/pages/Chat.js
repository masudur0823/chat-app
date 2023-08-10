import React, { useState, useEffect, useContext } from "react";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import ContactDetails from "../components/ContactDetails";
import http from "../utils/http";
import { SocketContext } from "../context/SocketContext";
import { ChatHeader } from "../assets/styles/chat/ChatHeader";
import { Avatar, Box, Typography } from "@mui/material";

function Chat() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  console.log("contacts", contacts);
  const socket = useContext(SocketContext);

  const sortContacts = (contactsArray) => {
    return contactsArray.sort(
      (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
    );
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on("new message", (newMessage) => {
      console.log("newMessage", newMessage);
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

      const updatedContacts = contacts.map((c) => {
        if (c.id === newMessage.contactId) {
          return {
            ...c,
            lastMessage: newMessage.text,
            lastMessageDate: newMessage.createdAt,
            // unreadCount: c.id === selectedContactId ? c.unreadCount : c.unreadCount + 1,
            unreadCount: isNaN(Number(c.unreadCount))
              ? 1
              : Number(c.unreadCount) + 1,
          };
        }
        return c;
      });

      console.log("updatedContacts", updatedContacts);
      setContacts(sortContacts(updatedContacts));
    });

    return () => {
      socket.off("new message");
    };
  }, [selectedContactId, socket, contacts]);

  useEffect(() => {
    setContacts([
      {
        id: 1,
        first_name: "Fernanda",
        last_name: "Gwyther",
        email: "fgwyther0@macromedia.com",
        phone: "+234 803 996 9052",
        amount: 0,
        get name() {
          return `${this.first_name} ${this.last_name}`;
        },
        lastMessage: "In congue. Etiam justo. Etiam pretium iaculis justo.",
        lastMessageDate: "7/14/2023",
        unreadCount: 1,
      },
      {
        id: 2,
        first_name: "Suzy",
        last_name: "Dovidian",
        email: "sdovidian1@disqus.com",
        phone: "+33 592 301 4092",
        amount: 2635,
        get name() {
          return `${this.first_name} ${this.last_name}`;
        },
        lastMessage:
          "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        lastMessageDate: "12/11/2022",
        unreadCount: 2,
      },
      {
        id: 3,
        first_name: "Alix",
        last_name: "Rubinovitsch",
        email: "arubinovitsch2@lulu.com",
        phone: "+86 972 603 9630",
        amount: 6,
        get name() {
          return `${this.first_name} ${this.last_name}`;
        },
        lastMessage:
          "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        lastMessageDate: "9/1/2022",
        unreadCount: 3,
      },
      {
        id: 4,
        first_name: "Pippo",
        last_name: "Boughtwood",
        email: "pboughtwood3@squarespace.com",
        phone: "+86 976 585 8901",
        amount: 961,
        get name() {
          return `${this.first_name} ${this.last_name}`;
        },
        lastMessage:
          "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
        lastMessageDate: "6/26/2023",
        unreadCount: 4,
      },
      {
        id: 5,
        first_name: "Ermin",
        last_name: "Chinery",
        email: "echinery4@amazon.de",
        phone: "+86 211 366 3817",
        amount: 642,
        get name() {
          return `${this.first_name} ${this.last_name}`;
        },
        lastMessage:
          "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        lastMessageDate: "2/27/2023",
        unreadCount: 5,
      },
    ]);
  }, []);

  const fetchContacts = (page) => {
    setIsLoading(true);
    http
      .get("/contacts", { params: { page } })
      .then((response) => {
        const newContacts = response.data.contacts.map((contact) => ({
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.tel,
          amount: contact.amount,
          id: contact.id,
          name: `${contact.first_name} ${contact.last_name}`,
          lastMessage: contact.messages[0]?.text || "",
          lastMessageDate: contact.messages[0]?.createdDate
            ? new Date(contact.messages[0].createdDate)
            : null,
          unreadCount: contact?.unreadCount,
        }));
        if (page === 1) {
          setContacts(newContacts);
        } else {
          setContacts((prevContacts) => [...prevContacts, ...newContacts]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);

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

  const selectedContact = contacts.find(
    (contact) => contact.id === selectedContactId
  );
  const messages = selectedContact ? selectedContact.messages : [];

  return (
    <>
      <ChatHeader>
        <Box className="chat-left">
          <Typography color="primary">Chat</Typography>
        </Box>
        <Box className="chat-right">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar  sx={{ width: 65, height: 65 }}>{selectedContact.name[0].toUpperCase()}</Avatar>
            <h2 style={{ marginLeft: "10px" }}>{selectedContact.name}</h2>
          </div>
        </Box>
      </ChatHeader>
      <div style={{ display: "flex" }}>
        <ContactList
          contacts={contacts}
          setSelectedContactId={setSelectedContactId}
          selectedContactId={selectedContactId}
          setContacts={setContacts}
          unreadCount={selectedContact ? selectedContact.unreadCount : 0}
          isLoading={isLoading}
          loadMoreContacts={() => setCurrentPage((prev) => prev + 1)}
        />
        {selectedContact && (
          <ChatContainer
            contact={selectedContact}
            messages={messages}
            setContacts={setContacts}
          />
        )}
        {/* {selectedContact && <ContactDetails contact={selectedContact} />} */}
      </div>
    </>
  );
}

export default Chat;
