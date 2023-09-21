import * as z from 'zod'
import { format } from 'date-fns'
import { useForm, Controller } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Input from '../../components/Input'
import { Select } from '../../components/Select'
import { useEmployee } from '../../hooks/useEmployee'
import { SelectItem } from '../../components/Select/SelectItem'
import { genders, occupations } from '../../configs/contant/employee'
import { useEffect } from 'react'
import { Button } from '../../components/Button'

const newEmployeeFormSchema = z.object({
  nome: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: 'O nome não pode conter números nem caracteres especiais',
    })
    .nonempty('O nome é obrigatório')
    .trim()
    .min(1, { message: 'Deve ter mais de 1 caractere' }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  nascimento: z.date().max(new Date('2005-01-01'), {
    message: 'Novo demais para trabalhar',
  }),
  rg: z
    .string()
    .regex(/^\d{1}\.\d{3}\.\d{3}$/, { message: 'RG inválido' })
    .nonempty('O rg é obrigatório'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: 'CPF inválido' })
    .nonempty('O cpf é obrigatório'),
  cargo: z
    .string()
    .nonempty('O cargo é obrigatório')
    .trim()
    .min(1, { message: 'Deve ter mais de 1 caractere' }),
  sexo: z
    .string()
    .nonempty('O sexo é obrigatório')
    .trim()
    .min(1, { message: 'Deve ter mais de 1 caractere' }),
  endereco: z.object({
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' })
      .nonempty('O UF é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    uf: z
      .string()
      .nonempty('O cep é obrigatório')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' })
      .max(2, { message: 'Deve ter apenas 2 caracteres' }),
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
      .string()
      .regex(/^\d+$/, { message: 'Número inválido' })
      .nonempty('O número é obrigatória')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    referencia: z
      .string()
      .nonempty('O referência é obrigatória')
      .trim()
      .min(1, { message: 'Deve ter mais de 1 caractere' }),
    telefone: z
      .string()
      .regex(/^\d{11}$/, { message: 'Número de telefone inválido' })
      .nonempty('O telefone é obrigatório')
      .trim()
      .min(11, { message: 'Deve ter mais de 1 caractere' }),
  }),
})

type NewEmployeeFormInputs = z.infer<typeof newEmployeeFormSchema>

export const NewEmployeeForm = () => {
  const {
    reset,
    control,
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
      setValue('endereco', employee.endereco)
      setValue('sexo', String(employee.sexo))
      setValue('cargo', employee.cargo)
    }
  }, [employee, setValue])

  const handleCreateNewEmployee = async (data: NewEmployeeFormInputs) => {
    console.log('data: ', data)
    const { nome, email, nascimento, rg, cpf, cargo, sexo, endereco } = data
    const formattedDateString = format(nascimento, 'yyyy-MM-dd')
    console.log('formattedDateString: ', formattedDateString)
    const gender = sexo !== 'False'

    if (!employee.id) {
      createEmployee({
        nome,
        email,
        dataNascimento: formattedDateString,
        rg,
        cpf,
        cargo,
        sexo: gender,
        endereco,
        senha: '12345',
      })

      reset()
    } else {
      updateEmployee({
        id: employee.id,
        nome,
        email,
        dataNascimento: formattedDateString,
        rg,
        cpf,
        sexo,
        cargo,
        endereco,
        senha: '12345',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewEmployee)}
      className="flex flex-col w-full gap-6 pt-8"
    >
      <section className="flex flex-col w-full gap-6 border-b border-gray-200 pb-5">
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="name" className="text-sm font-bold text-zinc-900">
              Nome
            </label>
            <Input.Root>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="name"
                    type="text"
                    placeholder="Digite o nome"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.nome && (
              <span className="text-sm text-error-500 mt-2">
                {errors.nome.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-900"
            >
              E-mail
            </label>
            <Input.Root>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="email"
                    type="email"
                    placeholder="Digite o e-mail"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.email && (
              <span className="font-sm text-error-500 mt-2">
                {errors.email.message}
              </span>
            )}
          </fieldset>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="rg" className="text-sm font-bold text-zinc-900">
              RG
            </label>
            <Input.Root>
              <Controller
                name="rg"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="rg"
                    type="text"
                    placeholder="Digite o rg"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.rg && (
              <span className="font-sm text-error-500 mt-2">
                {errors.rg.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="cpf" className="text-sm font-medium text-zinc-900">
              CPF
            </label>
            <Input.Root>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="cpf"
                    type="text"
                    placeholder="Digite o cpf"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.cpf && (
              <span className="font-sm text-error-500 mt-2">
                {errors.cpf.message}
              </span>
            )}
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
              <Controller
                name="nascimento"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="nascimento"
                    type="date"
                    placeholder="Digite o nascimento"
                    onChange={(e) => {
                      const selectedDate = new Date(
                        // eslint-disable-next-line prettier/prettier
                        e.target.value + 'T00:00:00'
                      )
                      field.onChange(selectedDate)
                    }}
                    value={
                      field.value
                        ? field.value.toISOString().split('T')[0]
                        : employee.dataNascimento
                        ? new Date(employee.dataNascimento)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                  />
                )}
              />
            </Input.Root>
            {errors.nascimento && (
              <span className="font-sm text-error-500 mt-2">
                {errors.nascimento.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-zinc-900"
            >
              Sexo
            </label>
            <Controller
              name="sexo"
              control={control}
              render={({ field }) => (
                <Select placeholder="Selecione o sexo" {...field}>
                  {Object.entries(genders).map(([key, gender]) => (
                    <SelectItem
                      key={key}
                      text={gender.title}
                      value={gender.value}
                    />
                  ))}
                </Select>
              )}
            />
            {errors.sexo && (
              <span className="font-sm text-error-500 mt-2">
                {errors.sexo.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="occupation"
              className="text-sm font-medium text-zinc-900"
            >
              Cargo
            </label>
            <Controller
              name="cargo"
              control={control}
              render={({ field }) => (
                <Select placeholder="Selecione a ocupação" {...field}>
                  {Object.entries(occupations).map(([key, occupation]) => (
                    <SelectItem
                      key={key}
                      text={occupation.title}
                      value={occupation.value}
                      {...register('cargo')}
                    />
                  ))}
                </Select>
              )}
            />
            {errors.cargo && (
              <span className="font-sm text-error-500 mt-2">
                {errors.cargo.message}
              </span>
            )}
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
              <Controller
                name="endereco.rua"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="street"
                    type="text"
                    placeholder="Digite a rua"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.rua && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.rua.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="neighborhoods"
              className="text-sm font-medium text-zinc-900"
            >
              Bairro
            </label>
            <Input.Root>
              <Controller
                name="endereco.bairro"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="neighborhoods"
                    type="text"
                    placeholder="Digite o bairro"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.bairro && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.bairro.message}
              </span>
            )}
          </fieldset>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="number" className="text-sm font-bold text-zinc-900">
              Número
            </label>
            <Input.Root>
              <Controller
                name="endereco.numero"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="number"
                    type="text"
                    placeholder="Digite o número"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.numero && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.numero.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="cep" className="text-sm font-medium text-zinc-900">
              CEP
            </label>
            <Input.Root>
              <Controller
                name="endereco.cep"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="cep"
                    type="text"
                    placeholder="Digite o cep"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.cep && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.cep.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label htmlFor="uf" className="text-sm font-medium text-zinc-900">
              UF
            </label>
            <Input.Root>
              <Controller
                name="endereco.uf"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="uf"
                    type="text"
                    placeholder="Digite o uf"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.uf && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.uf.message}
              </span>
            )}
          </fieldset>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="space-y-1">
            <label htmlFor="city" className="text-sm font-medium text-zinc-900">
              Cidade
            </label>
            <Input.Root>
              <Controller
                name="endereco.cidade"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="city"
                    type="text"
                    placeholder="Digite a cidade"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.cidade && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.cidade.message}
              </span>
            )}
          </fieldset>
          <fieldset className="space-y-1">
            <label
              htmlFor="telephone"
              className="text-sm font-medium text-zinc-900"
            >
              Telefone
            </label>
            <Input.Root>
              <Controller
                name="endereco.telefone"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="telephone"
                    type="text"
                    placeholder="Digite o telefone"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.telefone && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.telefone.message}
              </span>
            )}
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
              <Controller
                name="endereco.referencia"
                control={control}
                render={({ field }) => (
                  <Input.Control
                    id="reference"
                    type="text"
                    placeholder="Digite a referência"
                    {...field}
                  />
                )}
              />
            </Input.Root>
            {errors.endereco?.referencia && (
              <span className="font-sm text-error-500 mt-2">
                {errors.endereco?.referencia.message}
              </span>
            )}
          </fieldset>
        </div>
      </section>

      <div className="flex items-center justify-end gap-4 pt-5">
        <Dialog.Close asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Dialog.Close>
        <Button type="submit">Finalizar</Button>
      </div>
    </form>
  )
}
