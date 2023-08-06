import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, InputLabel } from '@mui/material';
import http from '../utils/http';

function EditContactDialog({ open, handleClose, contact, handleSave }) {
  const [formState, setFormState] = useState(contact);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Use axios to get users
    http.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    setFormState(contact);
    setUserId(contact.userId || ''); 
  }, [contact]);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleOwnerChange = (e) => {
    setUserId(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedFormState = { ...formState, userId };
    handleSave(updatedFormState);
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField name="first_name" margin="dense" label="First Name" type="text" fullWidth value={formState.first_name || ''} onChange={handleInputChange} />
          <TextField name="last_name" margin="dense" label="Last Name" type="text" fullWidth value={formState.last_name || ''} onChange={handleInputChange} />
          <TextField name="email" margin="dense" label="Email" type="email" fullWidth value={formState.email || ''} onChange={handleInputChange} />
          <TextField name="tel" margin="dense" label="Telephone" type="tel" fullWidth value={formState.tel || ''} onChange={handleInputChange} />
          <TextField name="channel" margin="dense" label="Channel" type="text" fullWidth value={formState.channel || ''} onChange={handleInputChange} />
          <TextField name="source" margin="dense" label="Source" type="text" fullWidth value={formState.source || ''} onChange={handleInputChange} />
          <InputLabel id="owner-label">Owner</InputLabel>
          <Select name="owner" labelId="owner-label" fullWidth value={userId} onChange={handleOwnerChange}>
            {users.map(user => <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>)}
          </Select>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditContactDialog;
