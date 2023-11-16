import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Employee } from "./pages/Employee";
import { Settings } from "./pages/Settings";
import { DefaultLayout } from "./layouts/DefaultLayout";

import { Class } from "@pages/Class";
import { Report } from "@pages/Report";
import { Student } from "./pages/Student";
import { EditStudent } from "@pages/Student/EditStudent";
import { FinishStep } from "@pages/Student/CreateNewStudent/FinishStep";
import { AddressStep } from "@pages/Student/CreateNewStudent/AddressStep";
import { ParentsStep } from "@pages/Student/CreateNewStudent/ParentsStep";
import { StudentStep } from "@pages/Student/CreateNewStudent/StudentStep";
import { CommentsStep } from "@pages/Student/CreateNewStudent/CommentsStep";
import { ParentsConditionsStep } from "@pages/Student/CreateNewStudent/ConditionsStep";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/classes" element={<Class />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/students" element={<Student />} />
        <Route  path="/students/new-student" element={<StudentStep />} />
        <Route path="/students/new-student/address" element={<AddressStep />} />
        <Route path="/students/new-student/comments" element={<CommentsStep />} />
        <Route path="/students/new-student/parents" element={<ParentsStep />} />
        <Route path="/students/new-student/conditions" element={<ParentsConditionsStep />} />
        <Route path="/students/new-student/finish" element={<FinishStep />} />

        <Route path="/students/:id" element={<EditStudent />} />
      </Route>
    </Routes>
  );
};
