import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Employee } from "./pages/Employee";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Settings } from "./pages/Settings";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
