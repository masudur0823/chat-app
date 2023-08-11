import React, { useEffect, useState } from "react";
import ContactTable from "../components/ContactTable";
import EditContactDialog from "../components/EditContactDialog";
import http from "../utils/http";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useContacts } from "../context/ContactContext";
import { CustomButton } from "../assets/styles/buttons";

function Contacts() {
  const { contacts, setContacts } = useContacts([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  const pageSize = 30;
  const [newContact, setNewContact] = useState({
    first_name: "",
    last_name: "",
    phoneNumber: "",
    email: "",
    channel: "",
  });

  useEffect(() => {
    http
      .get(`/contacts?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => {
        console.log(JSON.stringify(response));
        setContacts(response.data.contacts);
        setTotalContacts(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch contacts. Please try again later.");
      });
  }, [setContacts, currentPage]);

  // dummy contacts 
  // ----------------------------

  useEffect(() => {
    const dummyValue = [
      {
        first_name: "Kazi",
        last_name: "Masud",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Soikot",
        last_name: "Saha",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajim",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimc",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajims",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajims",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
      {
        first_name: "Tajimd",
        last_name: "Ahmed",
        phoneNumber: "01980573601",
        email: "masud@gmail.com",
      },
    ];
    setContacts(dummyValue);
    setTotalContacts(dummyValue.length);
  }, [setContacts]);

    // dummy contacts 
  // ----------------------------

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedContact(null);
    setDialogOpen(false);
  };

  const handleSave = async (updatedContact) => {
    try {
      await http.put(`/contacts/${updatedContact.id}`, updatedContact);
      // Update the contact in the contacts state
      setContacts((prevContacts) => {
        return prevContacts.map((contact) => {
          if (contact.id === updatedContact.id) {
            return updatedContact;
          } else {
            return contact;
          }
        });
      });
      setDialogOpen(false);
    } catch (error) {
      console.error("Error while updating contact:", error);
      alert("Error while updating contact. Please try again.");
    }
  };

  const handleNewContactChange = (event) => {
    const { name, value } = event.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    http
      .post("/contacts", newContact)
      .then((response) => {
        // Refresh the contacts list
        return http.get("/contacts");
      })
      .then((response) => {
        const contactsData = response.data.contacts;
        setContacts(contactsData);
        setNewDialogOpen(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = async (contactId) => {
    try {
      await http.delete(`/contacts/${contactId}`);
      // Remove the contact from the contacts state without reloading
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
    } catch (error) {
      console.error("Error while deleting contact:", error);
      alert("Error while deleting contact. Please try again.");
    }
  };

  return (
    <Box>
      {/* <Button
        color="primary"
        variant="contained"
        onClick={() => setNewDialogOpen(true)}
      >
        Add Contact
      </Button> */}
      <Box sx={{ padding: { s_xl: "0px 50px" } }}>
        <Box textAlign="end" pb={3}>
          <CustomButton
            color="lightGreen"
            variant="contained"
            onClick={() => setNewDialogOpen(true)}
          >
            Add
          </CustomButton>
        </Box>
        <ContactTable
          contacts={contacts}
          totalContacts={totalContacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={currentPage}
          setPage={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
      {selectedContact && (
        <EditContactDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          contact={selectedContact}
          handleSave={handleSave}
          page={currentPage}
          setPage={setCurrentPage}
          pageSize={pageSize}
        />
      )}

      <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            fullWidth
            value={newContact.first_name}
            onChange={handleNewContactChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            fullWidth
            value={newContact.last_name}
            onChange={handleNewContactChange}
          />
          <TextField
            margin="dense"
            name="tel"
            label="Phone Number"
            type="text"
            fullWidth
            value={newContact.tel}
            onChange={handleNewContactChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newContact.email}
            onChange={handleNewContactChange}
          />
          <Select
            value={newContact.channel}
            onChange={handleNewContactChange}
            name="channel"
            fullWidth
          >
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Whatsapp">Whatsapp</MenuItem>
            <MenuItem value="SMS">SMS</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddContact} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Contacts;
