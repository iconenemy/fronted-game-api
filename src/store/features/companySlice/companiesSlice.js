import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http/axios";

const initialState = {
    companies: [],
    status: 'loading', //  'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
    const response = await $api.get('/company/all')
    return response?.data
})


const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.companies = action.payload
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        }
})

export const selectAllCompanies = (state) => state.companies.companies;
export const getCompaniesStatus = (state) => state.companies.status;
export const getCompaniesError = (state) => state.companies.error;

export default companiesSlice.reducer