import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Employee } from "./pages/Employee";
import { Settings } from "./pages/Settings";
import { DefaultLayout } from "./layouts/DefaultLayout";

import { Student } from "./pages/Student";
import { AddressStep } from "@pages/Student/AddressStep";
import { ParentsStep } from "@pages/Student/ParentsStep";
import { ParentsConditionsStep } from "@pages/Student/ConditionsStep";
import { StudentStep } from "@pages/Student/StudentStep";
import { CommentsStep } from "@pages/Student/CommentsStep";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/students" element={<Student />} />
        <Route path="/students/new-student" element={<StudentStep />} />
        <Route path="/students/new-student/address" element={<AddressStep />} />
        <Route path="/students/new-student/comments" element={<CommentsStep />} />
        <Route path="/students/new-student/parents" element={<ParentsStep />} />
        <Route path="/students/new-student/housing" element={<ParentsConditionsStep />} />
      </Route>
    </Routes>
  );
};
