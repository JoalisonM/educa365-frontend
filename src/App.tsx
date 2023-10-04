import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@ui/components/ui/toaster";

import { Router } from "./Router";
import { EmployeeContextProvider } from "./contexts/employeeContext";
import { FormProvider } from "react-hook-form";
import { FormContextProvider } from "./contexts/formContext";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <FormContextProvider>
          <Router />
          <Toaster />
        </FormContextProvider>
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
