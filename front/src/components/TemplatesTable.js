import React, { useEffect, useState } from 'react';
import http from '../utils/http';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TemplatesTable() {
  const [templates, setTemplates] = useState([]);

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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.status}</TableCell>
              <TableCell>{template.language}</TableCell>
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
  );
}

export default TemplatesTable;
