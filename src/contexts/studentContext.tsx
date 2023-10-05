import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

import { Student } from "@api/student";
import { StudentProps, CreateStudentInput, UpdateStudentInput } from "@dtos/studentDTO";

interface StudentContextType {
  student: StudentProps;
  students: StudentProps[];
  fetchStudents: () => Promise<void>;
  deleteStudent: (id: string) => void;
  setStudent: (value: StudentProps) => void;
  getStudent: (id: string) => Promise<void>;
  createStudent: (data: CreateStudentInput) => Promise<void>;
  updateStudent: (data: UpdateStudentInput) => Promise<void>;
}

export const StudentContext = createContext({} as StudentContextType);

interface StudentContextProviderProps {
  children: ReactNode;
}

export const StudentContextProvider = ({ children }: StudentContextProviderProps) => {
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [student, setStudent] = useState<StudentProps>({} as StudentProps);

  const fetchStudents = useCallback(async () => {
    const response = await Student.getAll();

    setStudents(response.data);
  }, []);

  const getStudent = useCallback(async (id: string) => {
    const response = await Student.get(id);

    if (response) {
      setStudent(response.data);
    }

    return response.data;
  }, []);

  const createStudent = useCallback(async (data: CreateStudentInput) => {
    const response = await Student.create(data);

    setStudents((state) => [response.data, ...state]);
  }, []);

  const updateStudent = useCallback(async (data: UpdateStudentInput) => {
    const response = await Student.update(data);

    setStudents((state) =>
      state.map((student) =>
      student.id === data.id ? response.data : student,
      ),
    );
  }, []);

  const deleteStudent = async (id: string) => {
    Student.delete(id);

    setStudents((state) => state.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        students,
        setStudent,
        getStudent,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
