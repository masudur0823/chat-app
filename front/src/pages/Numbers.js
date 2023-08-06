import React, { useEffect, useState } from 'react';
import http from '../utils/http';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function NumbersTable() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    http.get('/numbers')
      .then(response => {
        setNumbers(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSwitchChange = (number) => {
    const updatedStatus = number.status === "active" ? "Inactive" : "Active";
    http.put(`/numbers/${number.id}`, { status: updatedStatus })
      .then(() => {
        setNumbers(numbers.map(n => n.id === number.id ? {...n, status: updatedStatus} : n));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeleteClick = (number) => {
    http.delete(`/numbers/${number.id}`)
      .then(() => {
        setNumbers(numbers.filter(n => n.id !== number.id));
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
            <TableCell>Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {numbers.map((number) => (
            <TableRow key={number.id}>
              <TableCell>{number.number}</TableCell>
              <TableCell>
                <Switch 
                  checked={number.status === 'Active'} 
                  onChange={() => handleSwitchChange(number)} 
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteClick(number)}>
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

export default NumbersTable;
