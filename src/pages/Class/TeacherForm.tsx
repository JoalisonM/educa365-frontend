import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";

import { useClass } from "@hooks/useClass";
import { Button } from "@components/Button";
import * as Select from "@components/Select";
import { useEmployee } from "@hooks/useEmployee";
import { SheetClose } from "@ui/components/ui/sheet";
import { classFormSchema } from "@schemas/classFormSchema";

export type ClassFormInputs = z.infer<typeof classFormSchema>;

interface TeacherFormProps {
  classId: string;
}

export const TeacherForm = ({ classId }: TeacherFormProps) => {
  const form = useForm<ClassFormInputs>({
    resolver: zodResolver(classFormSchema),
  });
  const {
    setValue,
    formState: { isDirty, isValid },
  } = form;
  const { addTeacher, institutionClass } = useClass();
  const { fetchEmployees, employees } = useEmployee();

  useEffect(() => {
    fetchEmployees("PROFESSOR(A)");
  }, []);

  useEffect(() => {
    if (institutionClass.id) {
      setValue("professor_id", institutionClass.professor.id);
    }
  }, [institutionClass, setValue]);

  const handleSaveClass = async (data: ClassFormInputs) => {
    await addTeacher(classId, data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSaveClass)}
        className="flex flex-1 flex-col w-full gap-6 pt-8"
      >
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="professor_id"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Professor(a)</FormLabel>
                <FormControl>
                  <Select.Root
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione o professor(a)"
                  >
                    {employees && employees.length > 0 && employees.map((employee) => (
                      <Select.Item
                        key={employee.id}
                        value={employee.id}
                        text={employee.nome}
                      />
                    ))}
                  </Select.Root>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto flex items-center justify-end gap-4 pt-5">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit" disabled={!isDirty || !isValid}>
              Finalizar
            </Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
};
