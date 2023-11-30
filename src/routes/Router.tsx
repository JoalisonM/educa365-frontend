import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Employee } from "../pages/Employee";
import { Settings } from "../pages/Settings";
import { DefaultLayout } from "../layouts/DefaultLayout";

import { Class } from "@pages/Class";
import { Report } from "@pages/Report";
import { Student } from "@pages/Student";
import { EditStudent } from "@pages/Student/EditStudent";
import { RequiredAuth } from "@contexts/auth/RequiredAuth";
import { FinishStep } from "@pages/Student/CreateNewStudent/FinishStep";
import { AddressStep } from "@pages/Student/CreateNewStudent/AddressStep";
import { ParentsStep } from "@pages/Student/CreateNewStudent/ParentsStep";
import { StudentStep } from "@pages/Student/CreateNewStudent/StudentStep";
import { CommentsStep } from "@pages/Student/CreateNewStudent/CommentsStep";
import { ParentsConditionsStep } from "@pages/Student/CreateNewStudent/ConditionsStep";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/employees" element={
          <RequiredAuth><Employee /></RequiredAuth>
        } />
        <Route path="/settings" element={
          <RequiredAuth><Settings /></RequiredAuth>
        } />
        <Route path="/classes" element={
          <RequiredAuth><Class /></RequiredAuth>
        } />
        <Route path="/reports" element={
          <RequiredAuth><Report /></RequiredAuth>
        } />
        <Route path="/students" element={
          <RequiredAuth><Student /></RequiredAuth>
        } />
        <Route path="/students/:id" element={
          <RequiredAuth><EditStudent /></RequiredAuth>
        } />
        <Route path="/students/new-student" element={
          <RequiredAuth><StudentStep /></RequiredAuth>
        } />
        <Route path="/students/new-student/address" element={
          <RequiredAuth><AddressStep /></RequiredAuth>
        } />
        <Route path="/students/new-student/comments" element={
          <RequiredAuth><CommentsStep /></RequiredAuth>
        } />
        <Route path="/students/new-student/parents" element={
          <RequiredAuth><ParentsStep /></RequiredAuth>
        } />
        <Route path="/students/new-student/conditions" element={
          <RequiredAuth><ParentsConditionsStep /></RequiredAuth>
        } />
        <Route path="/students/new-student/finish" element={
          <RequiredAuth><FinishStep /></RequiredAuth>
        } />
      </Route>
    </Routes>
  );
};
