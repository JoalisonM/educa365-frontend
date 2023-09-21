import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass, PencilSimpleLine, Trash } from '@phosphor-icons/react'

import { EmployeeProps } from '../../dtos'
import * as Input from '../../components/Input'
import { Drawer } from '../../components/Drawer'
import { NewEmployeeForm } from './NewEmployeeForm'
import { useEmployee } from '../../hooks/useEmployee'
import { Button } from '../../components/Button'

export const Employee = () => {
  const {
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    deleteEmployee,
  } = useEmployee()

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleShowEmployee = (id?: string) => {
    if (id) {
      getEmployee(id)
    } else {
      setEmployee({} as EmployeeProps)
    }
  }

  const handleDelete = (id: string) => {
    deleteEmployee(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-zinc-800">Funcionários</h1>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleShowEmployee()}
            >
              Adicionar
            </Button>
          </Dialog.Trigger>

          <Drawer title="Registro de funcionário">
            <NewEmployeeForm />
          </Drawer>
        </Dialog.Root>
      </div>

      <Input.Root className="mx-1 flex w-96 items-center gap-2 rounded-full bg-gray-50 border border-gray-300 px-3 py-2 shadow-sm">
        <Input.Prefix>
          <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control placeholder="Pesquisar" />
      </Input.Root>

      <table className="mt-4 table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-grayTableTitle">
            <th className="py-4 px-8">Nome</th>
            <th className="py-4 px-8">E-mail</th>
            <th className="py-4 px-8">Cargo</th>
            <th className="py-4 px-8">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => (
              <tr
                key={employee.id}
                className="bg-zinc-100 text-zinc-700 text-left"
              >
                <td className="py-5 px-8 rounded-tl-full rounded-bl-md">
                  {employee.nome}
                </td>
                <td className="py-5 px-8">{employee.email}</td>
                <td className="py-5 px-8">{employee.cargo}</td>
                <td className="py-5 px-8">{employee.dataNascimento}</td>
                <td className="py-5 px-8 text-right space-x-4">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleShowEmployee(employee.id)}
                      >
                        <PencilSimpleLine className="h-5 w-5" />
                      </Button>
                    </Dialog.Trigger>

                    <Drawer title="Registro de funcionário">
                      <NewEmployeeForm />
                    </Drawer>
                  </Dialog.Root>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
