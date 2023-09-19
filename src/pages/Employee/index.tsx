import { MagnifyingGlass } from '@phosphor-icons/react'

import { InputControl, InputPrefix, InputRoot } from '../../components/Input'

export const Employee = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold">Funcionários</h1>

        <button
          type="button"
          className="rounded-lg px-6 py-2 font-bold text-white bg-blueLagoon"
        >
          Adicionar
        </button>
      </div>

      {/* <div className="h-px bg-gray-200" /> */}

      <InputRoot className="mx-1 flex w-80 items-center gap-2 rounded-full bg-gray-50 border border-gray-300 px-3 py-2 shadow-sm">
        <InputPrefix>
          <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
        </InputPrefix>
        <InputControl placeholder="Pesquisar" />
      </InputRoot>

      <table className="mt-8 table-auto">
        <thead>
          <tr className="text-grayTableTitle">
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-zinc-100 rounded-sm p-2">
            <td>Joalison Matheus</td>
            <td>joalisonmatheus0@gmail.com</td>
            <td>21 anos</td>
            <td>10/03/2002</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
