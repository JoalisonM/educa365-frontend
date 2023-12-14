import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@ui/components/ui/toaster";

import { Router } from "./routes/Router";
import { FormContextProvider } from "./contexts/formContext";
import { ClassContextProvider } from "@contexts/classContext";
import { ReportContextProvider } from "@contexts/reportContext";
import { StudentContextProvider } from "@contexts/studentContext";
import { EmployeeContextProvider } from "./contexts/employeeContext";
import { AuthProvider } from "@contexts/auth";
import { ReportCommentsContextProvider } from "@contexts/reportCommentsContext";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <StudentContextProvider>
          <FormContextProvider>
            <ClassContextProvider>
              <ReportContextProvider>
                <ReportCommentsContextProvider>
                  <AuthProvider>
                    <Router />
                    <Toaster />
                  </AuthProvider>
                </ReportCommentsContextProvider>
              </ReportContextProvider>
            </ClassContextProvider>
          </FormContextProvider>
        </StudentContextProvider>
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
