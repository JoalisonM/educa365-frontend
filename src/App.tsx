import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@ui/components/ui/toaster";

import { Router } from "./Router";
import { EmployeeContextProvider } from "./contexts/employeeContext";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <Router />
        <Toaster />
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
