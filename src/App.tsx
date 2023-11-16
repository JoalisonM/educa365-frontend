import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@ui/components/ui/toaster";

import { Router } from "./Router";
import { FormContextProvider } from "./contexts/formContext";
import { EmployeeContextProvider } from "./contexts/employeeContext";
import { StudentContextProvider } from "@contexts/studentContext";
import { ClassContextProvider } from "@contexts/classContext";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <StudentContextProvider>
          <FormContextProvider>
            <ClassContextProvider>
              <Router />
              <Toaster />
            </ClassContextProvider>
          </FormContextProvider>
        </StudentContextProvider>
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
