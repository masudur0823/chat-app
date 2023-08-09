import React from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { TableContainerBox } from "../assets/styles/table";
import {
  Box,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CustomPagination } from "../assets/styles/table/pagination";
import { CustomButton } from "../assets/styles/buttons";

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

  // pagination -------------------------
  // -----------------------------------
  const [currentPage, setCurrentPage] = React.useState(0);
  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const itemsPerPage = 6; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const currentPageData = contacts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(contacts.length / itemsPerPage);

  return (
    <Box>
      {/* <TableContainer component={Paper}>
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
    </TableContainer> */}

      <TableContainerBox>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell sx={{textAlign:'center'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((contact, index) => (
              <TableRow key={index}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.tel}</TableCell>
                <TableCell>{contact.channel}</TableCell>
                <TableCell>{contact.source}</TableCell>
                <TableCell>{contact?.users?.username}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={2}>
                    <CustomButton
                      variant="contained"
                      color="lightBlue"
                      onClick={() => handleEditClick(contact)}
                    >
                      Edit
                    </CustomButton>
                    <CustomButton
                      variant="contained"
                      color="lightRed"
                      onClick={() => handleDeleteClick(contact.id)}
                    >
                      Delete
                    </CustomButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerBox>

      <Stack alignItems={"flex-end"}>
        <CustomPagination
          count={pageCount}
          onChange={handlePageChange}
          color="lightGrey"
          siblingCount={0}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIosIcon, next: ArrowForwardIosIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
}

export default ContactTable;
