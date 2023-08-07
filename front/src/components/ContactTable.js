import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ContactTable({
  contacts,
  onEdit,
  onDelete,
  page,
  setPage,
  pageSize,
  totalContacts,
}) {
  //console.log("CONTACTS ==> " + JSON.stringify(contacts));
  const handleEditClick = (contact) => {
    onEdit(contact);
  };

  const handleDeleteClick = (contactId) => {
    onDelete(contactId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    // Update pageSize state in parent component
    // This could also reload the data if needed
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telephone</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {contact.first_name}
              </TableCell>
              <TableCell>{contact.last_name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.tel}</TableCell>
              <TableCell>{contact.channel}</TableCell>
              <TableCell>{contact.source}</TableCell>
              <TableCell>{contact?.users?.username}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(contact)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(contact.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[30, 50, 100]}
              component="div"
              count={totalContacts} // Make sure you pass the total number of contacts from your API to the ContactTable and use it here
              rowsPerPage={pageSize}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count}`
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default ContactTable;
