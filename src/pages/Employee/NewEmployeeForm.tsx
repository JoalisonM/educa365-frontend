import * as z from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Input from '../../components/Input'
import { Select } from '../../components/Select'
import { useEmployee } from '../../hooks/useEmployee'
import { SelectItem } from '../../components/Select/SelectItem'
import { genders, occupations } from '../../configs/contant/employee'
import { useEffect } from 'react'

const newEmployeeFormSchema = z.object({
  nome: z
    .string()
    .nonempty('O nome é obrigatório')
    .trim()
    .min(1, { message: 'Deve ter mais de 1 caractere' }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  nascimento: z.date().max(new Date('2003-01-01'), {
    message: 'Novo demais para fazer faculdade',
  }),
  rg: z
    .string()
    .nonempty('O RG é obrigatório')
    .trim()
    .min(11, { message: 'Deve ter 7 caracteres' }),
  cpf: z
    .string()
    .nonempty('O CPF  é obrigatório')
    .trim()
    .min(11, { message: 'Deve ter 11 caracteres' }),
  cargo: z
    .string()
    .nonempty('O cargo é obrigatório')
    .trim()
    .min(1, { message: 'Deve ter mais de 1 caractere' }),
  sexo: z.boolean(),
  endereco: z.object({
    cep: z
      .string()
      .nonempty('O UF é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    uf: z
      .string()
      .nonempty('O cep é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    cidade: z
      .string()
      .nonempty('A cidade é obrigatória')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    rua: z
      .string()
      .nonempty('A rua é obrigatória')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    bairro: z
      .string()
      .nonempty('O bairro é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    numero: z
      .number()
      .nonnegative('Número tem que ser maior que 0')
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    referencia: z
      .string()
      .nonempty('O referência é obrigatória')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    telefone: z
      .string()
      .nonempty('O telefone é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
  }),
})

type NewEmployeeFormInputs = z.infer<typeof newEmployeeFormSchema>

export const NewEmployeeForm = () => {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewEmployeeFormInputs>({
    resolver: zodResolver(newEmployeeFormSchema),
  })
  const { employee, createEmployee, updateEmployee } = useEmployee()

  useEffect(() => {
    if (employee.id) {
      setValue('nome', employee.nome)
      setValue('email', employee.email)
      setValue('rg', employee.rg)
      setValue('cpf', employee.cpf)
      setValue('sexo', employee.sexo)
      setValue('cargo', employee.cargo)
      setValue('endereco', employee.endereco)
    }
  }, [employee])

  const handleCreateNewPessoa = async (data: NewEmployeeFormInputs) => {
    const { nome, email, nascimento, cargo, rg, cpf, sexo, endereco } = data
    const formattedDateString = format(nascimento, 'yyyy/MM/dd')

    if (!employee.id) {
      createEmployee({
        nome,
        email,
        nascimento: formattedDateString,
        rg,
        cpf,
        cargo,
        sexo,
        endereco,
      })

      reset()
    } else {
      updateEmployee({
        id: employee.id,
        nome,
        email,
        nascimento: formattedDateString,
        rg,
        cpf,
        sexo,
        cargo,
        endereco,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewPessoa)}
      className="flex flex-col w-full gap-6 pt-8"
    >
      <section className="flex flex-col w-full gap-6 border-b border-gray-200 pb-5">
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="name" className="text-sm font-bold text-zinc-900">
              Nome
            </label>
            <Input.Root>
              <Input.Control
                id="name"
                placeholder="Digite o nome"
                {...register('nome')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-900"
            >
              E-mail
            </label>
            <Input.Root>
              <Input.Control
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                {...register('email')}
              />
            </Input.Root>
          </fieldset>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="rg" className="text-sm font-bold text-zinc-900">
              RG
            </label>
            <Input.Root>
              <Input.Control id="rg" placeholder="Digite o RG" />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="cpf" className="text-sm font-medium text-zinc-900">
              CPF
            </label>
            <Input.Root>
              <Input.Control id="cpf" placeholder="Digite o CPF" />
            </Input.Root>
          </fieldset>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <fieldset className="space-y-1">
            <label
              htmlFor="birthday"
              className="text-sm font-bold text-zinc-900"
            >
              Data de nascimento
            </label>
            <Input.Root>
              <Input.Control
                id="birthday"
                type="date"
                {...register('nascimento')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-zinc-900"
            >
              Sexo
            </label>
            <Select placeholder="Selecionar o sexo">
              {Object.entries(genders).map(([key, gender]) => (
                <SelectItem
                  key={key}
                  text={gender.title}
                  value={String(gender.value)}
                  {...register('sexo')}
                />
              ))}
            </Select>
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="occupation"
              className="text-sm font-medium text-zinc-900"
            >
              Cargo
            </label>
            <Select placeholder="Selecionar a ocupação">
              {Object.entries(occupations).map(([key, occupation]) => (
                <SelectItem
                  key={key}
                  text={occupation.title}
                  value={occupation.value}
                  {...register('cargo')}
                />
              ))}
            </Select>
          </fieldset>
        </div>
      </section>

      <section className="flex flex-col w-full gap-6">
        <h1 className="text-xl font-bold">Endereço</h1>
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="street" className="text-sm font-bold text-zinc-900">
              Rua
            </label>
            <Input.Root>
              <Input.Control
                id="street"
                placeholder="Digite a rua"
                {...register('endereco.rua')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="neighborhoods"
              className="text-sm font-medium text-zinc-900"
            >
              Bairro
            </label>
            <Input.Root>
              <Input.Control
                id="neighborhoods"
                placeholder="Digite a rua"
                {...register('endereco.bairro')}
              />
            </Input.Root>
          </fieldset>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="number" className="text-sm font-bold text-zinc-900">
              Número
            </label>
            <Input.Root>
              <Input.Control
                id="number"
                placeholder="Digite o número"
                {...register('endereco.numero')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="cep" className="text-sm font-medium text-zinc-900">
              CEP
            </label>
            <Input.Root>
              <Input.Control
                id="cep"
                placeholder="Digite o CEP"
                {...register('endereco.cep')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="uf" className="text-sm font-medium text-zinc-900">
              UF
            </label>
            <Input.Root>
              <Input.Control
                id="uf"
                placeholder="Digite a UF"
                {...register('endereco.uf')}
              />
            </Input.Root>
          </fieldset>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="city" className="text-sm font-medium text-zinc-900">
              Cidade
            </label>
            <Input.Root>
              <Input.Control
                id="city"
                placeholder="Digite a cidade"
                {...register('endereco.cidade')}
              />
            </Input.Root>
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="telephone"
              className="text-sm font-medium text-zinc-900"
            >
              Telefone
            </label>
            <Input.Root>
              <Input.Control
                id="telephone"
                placeholder="Digite o telefone"
                {...register('endereco.telefone')}
              />
            </Input.Root>
          </fieldset>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <fieldset className="space-y-1">
            <label
              htmlFor="reference"
              className="text-sm font-medium text-zinc-900"
            >
              Referência
            </label>
            <Input.Root>
              <Input.Control
                id="reference"
                placeholder="Digite a referência"
                {...register('endereco.referencia')}
              />
            </Input.Root>
          </fieldset>
        </div>
      </section>

      <div className="flex items-center justify-end gap-4 pt-5">
        <Dialog.Close asChild>
          <button
            type="button"
            className="rounded-lg px-6 py-2 font-bold border border-zinc-500 text-zinc-500"
          >
            Cancelar
          </button>
        </Dialog.Close>
        <button
          type="submit"
          className="rounded-lg px-6 py-2 font-bold text-white bg-blueLagoon"
        >
          Finalizar
        </button>
      </div>
    </form>
  )
}
