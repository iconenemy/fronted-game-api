import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/system";
import { MenuItem } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddchartIcon from "@mui/icons-material/Addchart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAccount,
  getAccountsStatus,
} from "../store/features/accountSlice/accountsSlisce";
import {
  fetchCompanies,
  getCompaniesStatus,
  selectAllCompanies,
} from "../store/features/companySlice/companiesSlice";
import Loading from "./Loading";

const AccountCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: null,
    is_paid: false,
  });

  const [company, setCompany] = useState("");
  const [currency, setCurrency] = useState("");

  const companies = useSelector(selectAllCompanies);
  const statusAccounts = useSelector(getAccountsStatus);
  const statusCompanies = useSelector(getCompaniesStatus);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const checkboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const changeCompany = (event) => {
    setCompany(event.target.value);
  };

  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    dispatch(addNewAccount({ ...formData, price: Number(formData.price), currency:  currency, company: company}));
    if (statusAccounts === "succeeded") navigate("/");
  };

  if (statusCompanies === "loading") return <Loading />;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#2596be", color: "#fff" }}>
          <AddchartIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"#2596be"}>
          Game creation
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            color="neutral"
            autoFocus
            fullWidth
            required
            name="name"
            label="Name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="neutral"
            fullWidth
            required
            select
            value={company}
            name="company"
            label="Company"
            onChange={changeCompany}
          >
            {companies.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="number"
            fullWidth
            color="neutral"
            required
            name="price"
            label="Price"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            color="neutral"
            fullWidth
            required
            select
            value={currency}
            name="currency"
            label="Currency"
            onChange={changeCurrency}
          >
            <MenuItem value={"$"}>$</MenuItem>
            <MenuItem value={"€"}>€</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox onChange={checkboxChange} checked={formData.is_paid} />
            }
            label="Paid"
            color="#2596be"
            name="is_paid"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Link to="/">
            <Button
              color="neutral"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<ArrowBackIcon />}
            >
              Go back
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            color="neutral"
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            endIcon={<AddCardIcon />}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountCreate;
