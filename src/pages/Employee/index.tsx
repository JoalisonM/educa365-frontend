import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass, Trash } from '@phosphor-icons/react'

import * as Input from '../../components/Input'
import { Drawer } from '../../components/Drawer'
import { NewEmployeeForm } from './NewEmployeeForm'
import { useEmployee } from '../../hooks/useEmployee'

export const Employee = () => {
  const {
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    deleteEmployee,
  } = useEmployee()

  // useEffect(() => {
  //   fetchEmployees()
  // }, [fetchEmployees])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-zinc-800">Funcionários</h1>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="rounded-lg px-6 py-2 font-bold text-white bg-blueLagoon"
            >
              Adicionar
            </button>
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
            <th className="py-4 px-8">Idade</th>
            <th className="py-4 px-8">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-zinc-100 text-zinc-700 text-left">
            <td className="py-5 px-8 rounded-tl-full rounded-bl-md">
              Joalison Matheus
            </td>
            <td className="py-5 px-8">joalisonmatheus0@gmail.com</td>
            <td className="py-5 px-8">21 anos</td>
            <td className="py-5 px-8">10/03/2002</td>
            <td className="py-5 px-8">
              <Trash className="h-5 w-5 text-zinc-500 hover:text-red-500 transition duration-300" />
            </td>
          </tr>
          <tr className="bg-zinc-100 text-zinc-700 text-left">
            <td className="py-5 px-8 rounded-tl-full rounded-bl-md">
              Joalison Matheus
            </td>
            <td className="py-5 px-8">joalisonmatheus0@gmail.com</td>
            <td className="py-5 px-8">21 anos</td>
            <td className="py-5 px-8">10/03/2002</td>
            <td className="py-5 px-8">
              <Trash className="h-5 w-5 text-zinc-500 hover:text-red-500 transition duration-300" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
