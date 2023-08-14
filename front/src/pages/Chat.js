import React, { useState, useEffect, useContext } from "react";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import ContactDetails from "../components/ContactDetails";
import http from "../utils/http";
import { SocketContext } from "../context/SocketContext";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { CustomButton2 } from "../assets/styles/buttons";
import { StyledBadge } from "../assets/styles/chat";
import { ChatContainerBox } from "../assets/styles/chat";

function Chat() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(0);

  // console.log("contacts", contacts);
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

  // dummy conatcts start
  // ----------------------------------
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
    ]);
  }, []);
  // dummy conatcts end
  // ----------------------------------

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
      <ChatContainerBox show={show} selectedContact={selectedContact}>
        <Box className="chat-left">
          <Box className="chat-left-header">
            <Typography>Chat</Typography>
          </Box>
          <ContactList
            contacts={contacts}
            setSelectedContactId={setSelectedContactId}
            selectedContactId={selectedContactId}
            setContacts={setContacts}
            unreadCount={selectedContact ? selectedContact.unreadCount : 0}
            isLoading={isLoading}
            loadMoreContacts={() => setCurrentPage((prev) => prev + 1)}
            setShow={setShow}
          />
        </Box>

        {selectedContact && (
          <Box className="chat-right">
            <Box className="chat-right-header">
              <Stack
                className="chat-header-inner"
                direction="row"
                justifyContent="space-between"
                width="100%"
                flexWrap="wrap"
              >
                <Stack
                  direction="row"
                  gap={2}
                  alignItems="flex-start"
                  sx={{ width: "100%" }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <IconButton onClick={() => setShow(0)}>{"<"}</IconButton>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar
                        sx={{
                          width: { s_xl: 65 },
                          height: { s_xl: 65 },
                          fontWeight: 500,
                          background: "rgba(20, 133, 255, 0.10)",
                          color: "primary.main",
                          border: "1px solid rgba(20, 133, 255, 0.10)",
                        }}
                      >
                        {selectedContact?.name[0].toUpperCase()}
                      </Avatar>
                    </StyledBadge>
                  </Stack>
                  <Stack gap={1} sx={{ width: "100%" }}>
                    <Typography color="primary" variant="h2">
                      {selectedContact?.name}{" "}
                      <Typography
                        component="span"
                        color="primary"
                        fontWeight={500}
                        sx={{ float: "right" }}
                      >
                        Agent
                      </Typography>
                    </Typography>
                    <Stack
                      direction="row"
                      gap={{ sm: 2, xs: 1 }}
                      flexWrap="wrap"
                    >
                      <CustomButton2 variant="contained" color="blue">
                        100 User
                      </CustomButton2>
                      <CustomButton2 variant="contained" color="orange">
                        Urgent
                      </CustomButton2>
                      <CustomButton2 variant="contained" color="violet2">
                        Customer
                      </CustomButton2>
                      <CustomButton2 variant="contained" color="primary2">
                        Add Tag
                      </CustomButton2>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            <ChatContainer
              contact={selectedContact}
              messages={messages}
              setContacts={setContacts}
            />
          </Box>
        )}
      </ChatContainerBox>

      {/* {selectedContact && <ContactDetails contact={selectedContact} />} */}
    </>
  );
}

export default Chat;
