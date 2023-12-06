import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { useToast } from "@ui/components/ui/use-toast";

import { Class } from "@api/class";
import { ClassProps } from "@dtos/class";

interface CreateClassesProps {
  professor_id: string;
}

interface ClassContextType {
  classes: ClassProps[];
  institutionClass: ClassProps;
  createClasses: () => Promise<void>;
  getClass: (id: string) => Promise<void>;
  deleteClass: (id: string | number) => void;
  fetchClasses: (cargo?: string) => Promise<void>;
  addTeacher: (id: string, params: CreateClassesProps) => Promise<void>;
}

export const ClassContext = createContext({} as ClassContextType);

interface ClassContextProviderProps {
  children: ReactNode;
}

export const ClassContextProvider = ({
  children,
}: ClassContextProviderProps) => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Array<ClassProps>>([]);
  const [institutionClass, setInstitutionClass] = useState<ClassProps>({} as ClassProps);

  const fetchClasses = useCallback(async () => {
    const response = await Class.getAll();

    setClasses(response.data);
  }, []);

  const getClass = useCallback(async (id: string) => {
    const response = await Class.get(id);

    setInstitutionClass(response.data);
  }, []);

  const addTeacher = useCallback(async (id: string, params: CreateClassesProps) => {
    try {
      const response = await Class.addTeacher(id, params);

      setClasses((state) => state.map(
        (institutionClass) => institutionClass.id === id ? response.data : institutionClass),
      );

      toast({
        title: "Professor adicionado com sucesso!",
      });
    } catch (err) {
      toast({
        title: "Erro ao adicionar professor.",
      });
    }
  }, []);

  const createClasses = useCallback(async () => {
    try {
      await Class.createClasses();
      const response = await Class.getAll();
      setClasses(response.data);

      toast({
        title: "Turmas criadas com sucesso!",
      });
    } catch (err) {
      toast({
        title: "Erro ao criar turmas.",
      });
    }
  }, []);

  const deleteClass = async (id: string | number) => {
    Class.delete(id);

    setClasses((state) => state.filter((institutionClass) => institutionClass.id !== id));
  };

  return (
    <ClassContext.Provider
      value={{
        getClass,
        classes,
        addTeacher,
        deleteClass,
        fetchClasses,
        createClasses,
        institutionClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
