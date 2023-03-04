import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http/axios";

const initialState = {
    accounts: [],
    status: 'loading', //  'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
    const response = await $api.get('/account/all')
    return response?.data
})

export const addNewAccount = createAsyncThunk('accounts/addNewAccount', async (data) => {
    const response = await $api.post('/account/create', data)
    return response?.data
})

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (data) => {
    const {id, is_paid} = data
    const response = await $api.put(`/account/update/${id}`, {is_paid: is_paid})
    return response?.data
})

export const findByCompaniesNameAccount = createAsyncThunk('accounts/findByCompaniesNameAccount', async (data) => {
    const response = await $api.post('account/name/find', data)
    return response?.data
})


const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accounts = action.payload
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAccount.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accounts.push(action.payload)
            })
            .addCase(addNewAccount.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(updateAccount.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                const {_id, is_paid} = action.payload
                const account = state.accounts.find(item => item._id === _id) 
                if (account) {
                    account.is_paid = is_paid
                }                
                state.status = 'succeeded'
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(findByCompaniesNameAccount.fulfilled, (state, action) => {
                state.error = 'succeeded'
                state.accounts = action.payload
            })
        }
})

export const selectAllAccounts = (state) => state.accounts.accounts;
export const getAccountsStatus = (state) => state.accounts.status;
export const getAccountsError = (state) => state.accounts.error;

export default accountsSlice.reducer