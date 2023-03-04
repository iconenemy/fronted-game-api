import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import {
  fetchAccounts,
  getAccountsStatus,
  selectAllAccounts,
} from "../store/features/accountSlice/accountsSlisce";
import Loading from "./Loading";
import AccountItem from "./AccountItem";
import {
  fetchCompanies,
  getCompaniesStatus,
} from "../store/features/companySlice/companiesSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2596be",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const tableHeader = [
  "ID",
  "Company",
  "Game",
  "Price",
  "Currency",
  "Created date",
  "Paid",
];

const AccountList = () => {
  const dispatch = useDispatch();

  const accounts = useSelector(selectAllAccounts);
  const accountsStatus = useSelector(getAccountsStatus);
  const companiesStatus = useSelector(getCompaniesStatus);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (accountsStatus === "loading" || companiesStatus === "loading")
    return <Loading />;
  return (
    <>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableHeader.map((item, idx) => (
                  <StyledTableCell key={idx} align="center">
                    {item}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {accountsStatus === "succeeded" &&
                accounts.map((item) => (
                  <AccountItem item={item} key={item._id} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 5 }}>
          <Link
            to={`/create`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="contained"
              color="neutral"
              endIcon={<NoteAddIcon />}
            >
              Create
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default AccountList;
