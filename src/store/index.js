import { configureStore } from "@reduxjs/toolkit";
import accountsRedicer from "./features/accountSlice/accountsSlisce";
import companiesSlice from "./features/companySlice/companiesSlice";

export const store = configureStore({
    reducer: {
        accounts: accountsRedicer,
        companies: companiesSlice
    }
})