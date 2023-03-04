import React, { useEffect, useState } from "react";
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
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";

import {
  fetchAccounts,
  findByCompaniesNameAccount,
  getAccountsStatus,
  selectAllAccounts,
} from "../store/features/accountSlice/accountsSlisce";
import Loading from "./Loading";
import AccountItem from "./AccountItem";
import {
  fetchCompanies,
  getCompaniesStatus,
  selectAllCompanies,
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
  const companies = useSelector(selectAllCompanies);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [companyQuery, setCompanyQuery] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    if (event.target.checked === true) {
      setCompanyQuery(currentArray => [...currentArray, event.target.value])
    } else {
      setCompanyQuery(currentArray => currentArray.filter(item => item !== event.target.value))
    }
  };

  const handleFilter = () => {
      dispatch(findByCompaniesNameAccount({company: companyQuery})) 
  };

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
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<TuneIcon />}
          variant="contained"
        >
          Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ display: "flex", justifyContent: "center" }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {companies.map((itm) => (
            <MenuItem key={itm._id}>
              <FormControlLabel
                control={
                  <Checkbox value={itm._id} onChange={handleChange} />
                }
                label={itm.name}
              />
            </MenuItem>
          ))}
          <MenuItem>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleFilter}
            >
              Find
            </Button>
          </MenuItem>
        </Menu>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
