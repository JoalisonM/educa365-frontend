import { BrowserRouter } from 'react-router-dom'

import { Router } from './Router'
import { EmployeeContextProvider } from './contexts/employeeContext'

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <Router />
      </EmployeeContextProvider>
    </BrowserRouter>
  )
}

export default App
