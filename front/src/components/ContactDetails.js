import React, { useState, useEffect } from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import http from '../utils/http';

function ContactDetails({ contact }) {
    console.log(contact);
    const [contactDetails, setContactDetails] = useState({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        stage: contact.stage || '',
        amount: contact.amount || '',
    });

    // Use effect hook to update contact details when 'contact' changes
    useEffect(() => {
        setContactDetails({
            first_name: contact.first_name || '',
            last_name: contact.last_name || '',
            stage: contact.stage || '',
            amount: contact.amount || '',
        });
    }, [contact]);

    const handleInputChange = (field) => (event) => {
        setContactDetails({
            ...contactDetails,
            [field]: event.target.value,
        });
    };

    const handleSave = () => {
        http.put(`/contacts/${contact.id}`, contactDetails)
            .then(response => {
                alert("Contact updated successfully!");
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to update contact.");
            });
    };


    return (
        <div style={{ width: '25%', padding: '10px' }}>
            {contact.image ? (
        <img src={contact.image} alt="Contact" style={{ width: '100%', borderRadius: '50%' }} />
      ) : (
        <Avatar>{contact.first_name && contact.first_name[0] ? contact.first_name[0].toUpperCase() : '?'}</Avatar>
      )}

      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.email}</p>
            <TextField 
                label="First Name"
                value={contactDetails.first_name}
                onChange={handleInputChange('first_name')}
            />
            <TextField 
                label="Last Name"
                value={contactDetails.last_name}
                onChange={handleInputChange('last_name')}
            />
            <TextField 
                label="Stage"
                value={contactDetails.stage}
                onChange={handleInputChange('stage')}
            />
            <TextField 
                label="Amount"
                value={contactDetails.amount}
                onChange={handleInputChange('amount')}
            />
            {/* ... similar for other fields ... */}
            
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
        </div>
    );
}

export default ContactDetails;
