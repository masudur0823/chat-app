import React, { useState, useRef, useEffect } from "react";
import { Badge, Avatar, Typography, Box, Stack } from "@mui/material";
import { ContactListBox, StyledBadge } from "../assets/styles/chat";
import CustomTabs from "./CustomTabs";
import {
  ContactCard,
  ContactCardMain,
} from "../assets/styles/chat/contactCard";
import { CustomButton2 } from "../assets/styles/buttons";

function ContactList({
  setSelectedContactId,
  selectedContactId,
  contacts,
  setContacts,
  isLoading,
  loadMoreContacts,
}) {
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
      listElem.addEventListener("scroll", handleScroll);
      return () => listElem.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading, loadMoreContacts]);

  const filteredContacts = safeContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contactId) => {
    const updatedContacts = safeContacts.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, unreadCount: 0 };
      }
      return contact;
    });

    // This assumes you'll pass a prop named setContacts from the parent Chat component
    setContacts(updatedContacts);
  };

  return (
    <CustomTabs
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      ref={contactListRef}
      lables={["Conversation", "Contacts"]}
      values={[
        <Conversation
          filteredContacts={filteredContacts}
          selectedContactId={selectedContactId}
          setSelectedContactId={setSelectedContactId}
          handleContactClick={handleContactClick}
          isLoading={isLoading}
        />,
        <Contacts />,
      ]}
    />
  );
}

export default ContactList;

function Conversation({
  filteredContacts,
  selectedContactId,
  setSelectedContactId,
  handleContactClick,
  isLoading,
}) {
  return (
    <>
      <ContactCardMain>
        {filteredContacts.map((contact, index) => {
          return (
            <ContactCard
              key={index}
              onClick={() => {
                setSelectedContactId(contact.id);
                handleContactClick(contact.id);
              }}
              sx={{
                backgroundColor:
                  contact.id === selectedContactId
                    ? "rgba(20, 133, 255, 0.05)"
                    : index % 2 === 0
                    ? ""
                    : "white",
              }}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                {" "}
                <Avatar
                  sx={{
                    fontWeight: 500,
                    background: "rgba(20, 133, 255, 0.10)",
                    color: "primary.main",
                    border: "1px solid rgba(20, 133, 255, 0.10)",
                  }}
                >
                  {contact.name[0].toUpperCase()}
                </Avatar>
              </StyledBadge>

              <Stack gap={2} sx={{ width: "100%" }}>
                <Box>
                  <Typography variant="h3" color="primary">
                    {contact.name}
                    <Typography component="span" className="time">
                      12:45
                    </Typography>
                  </Typography>
                  <Typography>
                    {contact.lastMessage.substring(0, 30)}...
                  </Typography>
                </Box>
                {/* <p style={{ margin: 0, fontSize: "0.7em" }}>
                  {contact.lastMessageDate && new Intl.DateTimeFormat('en-US', {
              year: 'numeric',s
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }).format(contact.lastMessageDate)}
                </p> */}
                <Stack direction="row" gap={1} flexWrap="wrap">
                  <CustomButton2 variant="contained" color="blue">
                    100 user
                  </CustomButton2>
                  <CustomButton2 variant="contained" color="orange">
                    Urgent
                  </CustomButton2>
                  <CustomButton2 variant="contained" color="violet2">
                    Customer
                  </CustomButton2>
                </Stack>
              </Stack>

              {contact.unreadCount > 0 && (
                <Badge
                  badgeContent={contact.unreadCount}
                  color="primary"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              )}
            </ContactCard>
          );
        })}
        {isLoading && <div>Loading more contacts...</div>}
      </ContactCardMain>
    </>
  );
}

function Contacts() {
  return <Typography>No Contact Found</Typography>;
}
