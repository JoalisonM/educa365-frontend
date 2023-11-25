import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@ui/components/ui/toaster";

import { Router } from "./Router";
import { FormContextProvider } from "./contexts/formContext";
import { ClassContextProvider } from "@contexts/classContext";
import { ReportContextProvider } from "@contexts/reportContext";
import { StudentContextProvider } from "@contexts/studentContext";
import { EmployeeContextProvider } from "./contexts/employeeContext";
import { AuthProvider } from "@contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <StudentContextProvider>
          <FormContextProvider>
            <ClassContextProvider>
              <ReportContextProvider>
                <AuthProvider>
                  <Router />
                  <Toaster />
                </AuthProvider>
              </ReportContextProvider>
            </ClassContextProvider>
          </FormContextProvider>
        </StudentContextProvider>
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
