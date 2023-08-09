import React from "react";
import { SettingsTableContainer } from "../assets/styles/table/settingsTable";
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
import { CustomButton } from "../assets/styles/buttons";
import { CustomPagination } from "../assets/styles/table/pagination";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function SettingsTable({ data }) {
  // pagination -------------------------
  // -----------------------------------
  const [currentPage, setCurrentPage] = React.useState(0);
  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const itemsPerPage = 3; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const currentPageData = data?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  return (
    <Box sx={{ width: { sm: "300px", xs: "100%" } }}>
      <SettingsTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData?.map((item) => (
              <TableRow>
                <TableCell>{item}</TableCell>
                <TableCell>
                  <CustomButton
                    style={{ textTransform: "capitalize", padding: "0px 20px" }}
                    variant="contained"
                    color="lightRed"
                    //   onClick={() => handleDeleteClick(contact.id)}
                  >
                    Delete
                  </CustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SettingsTableContainer>

      <Stack alignItems={"center"}>
        <CustomPagination
          settings="true"
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

export default SettingsTable;
