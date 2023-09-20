import { useContextSelector } from 'use-context-selector'

import { EmployeeContext } from '../contexts/employeeContext'

export const useEmployee = () => {
  const employee = useContextSelector(
    EmployeeContext,
    (context) => context.employee,
  )
  const employees = useContextSelector(
    EmployeeContext,
    (context) => context.employees,
  )
  const getEmployee = useContextSelector(
    EmployeeContext,
    (context) => context.getEmployee,
  )
  const setEmployee = useContextSelector(
    EmployeeContext,
    (context) => context.setEmployee,
  )
  const fetchEmployees = useContextSelector(
    EmployeeContext,
    (context) => context.fetchEmployees,
  )
  const createEmployee = useContextSelector(
    EmployeeContext,
    (context) => context.createEmployee,
  )
  const updateEmployee = useContextSelector(
    EmployeeContext,
    (context) => context.updateEmployee,
  )
  const deleteEmployee = useContextSelector(
    EmployeeContext,
    (context) => context.deleteEmployee,
  )

  return {
    employee,
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
}
