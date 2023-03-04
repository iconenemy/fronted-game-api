import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import Loading from "./Loading";

import {
  getAccountsStatus,
  updateAccount,
} from "../store/features/accountSlice/accountsSlisce";
import { selectAllCompanies } from "../store/features/companySlice/companiesSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2596be",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AccountItem = ({ item }) => {
  const dispatch = useDispatch();

  const companies = useSelector(selectAllCompanies);
  const accountsStatus = useSelector(getAccountsStatus);

  const handleSubmit = (event, id, is_paid) => {
    event.preventDefault();
    dispatch(updateAccount({ id, is_paid: !is_paid }));
  };

  if (accountsStatus === "loading") return <Loading />;

  return (
    <StyledTableRow key={item._id}>
      <StyledTableCell align="center">{item._id}</StyledTableCell>
      {companies.map(
        (itm) =>
          itm._id === item.company && (
            <StyledTableCell key={item._id} align="center">
              {itm.name}
            </StyledTableCell>
          )
      )}
      <StyledTableCell align="center">{item.name}</StyledTableCell>
      <StyledTableCell align="center">{item.price}</StyledTableCell>
      <StyledTableCell align="center">{item.currency}</StyledTableCell>
      <StyledTableCell align="center">{item.createdAt}</StyledTableCell>
      {item.is_paid === true ? (
        <StyledTableCell align="center">{item.updatedAt}</StyledTableCell>
      ) : (
        <StyledTableCell align="center">
          <Button
            variant="contained"
            color="neutral"
            onClick={(event) => handleSubmit(event, item._id, item.is_paid)}
          >
            Pay the bill
          </Button>
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default AccountItem;
