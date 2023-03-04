import { Routes, Route } from "react-router-dom";

import "./App.css";
import AccountCreate from "./components/AccountCreate";
import AccountList from "./components/AccountList";
import Layout from "./components/Layout";
import Loading from "./components/Loading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AccountList />} />
        <Route path="create" element={<AccountCreate />} />
        <Route path="loading" element={<Loading/>} />
      </Route>
    </Routes>
  );
}

export default App;
