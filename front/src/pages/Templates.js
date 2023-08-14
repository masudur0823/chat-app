import React, { useEffect, useState } from 'react';
import http from '../utils/http';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,  Button, Dialog, TextField, 
    DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Templates() {
  const [templates, setTemplates] = useState([]);
  // const [dialogOpen, setDialogOpen] = useState(false);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    language: '',
    text: ''
  });

  useEffect(() => {
    http.get('/templates')
      .then(response => {
        console.log(response)
        setTemplates(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const handleDeleteClick = (template) => {
    http.delete(`/templates/${template.id}`)
      .then(() => {
        setTemplates(templates.filter(n => n.id !== template.id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleNewTemplateChange = (event) => {
    const { name, value } = event.target;
    setNewTemplate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const handleAddTemplate = () => {
    http.post('/templates', newTemplate)
      .then(response => {
        // Refresh the contacts list
        return http.get('/templates');
      })
      .then(response => {
        const templatesData = response.data;
        setTemplates(templatesData);
        setNewDialogOpen(false);
        setNewTemplate({
            name: '',
            language: '',
            text: '',
            type: '',
            category: ''
          });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
        <Button color="primary" variant="contained" onClick={() => setNewDialogOpen(true)}>
        Add Template
      </Button>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.status}</TableCell>
              <TableCell>{template.language}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteClick(template)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)}>
        <DialogTitle>Add New Template</DialogTitle>
        <DialogContent> 
          <TextField
            autoFocus
            margin="dense" 
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newTemplate.name}
            onChange={handleNewTemplateChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="language"
            label="Language"
            type="text"
            fullWidth
            value={newTemplate.language}
            onChange={handleNewTemplateChange}
          />
          <TextField
            margin="dense"
            name="text"
            label="Text"
            type="text"
            fullWidth
            value={newTemplate.text}
            onChange={handleNewTemplateChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="type"
            fullWidth
            value={newTemplate.type}
            onChange={handleNewTemplateChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="category"
            fullWidth
            value={newTemplate.category}
            onChange={handleNewTemplateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTemplate} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export default Templates;
