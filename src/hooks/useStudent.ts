import { useContextSelector } from "use-context-selector";

import { StudentContext } from "@contexts/studentContext";

export const useStudent = () => {
  const student = useContextSelector(StudentContext, (context) => context.student);
  const students = useContextSelector(StudentContext, (context) => context.students);
  const setStudent = useContextSelector(StudentContext, (context) => context.setStudent);
  const getStudent = useContextSelector(StudentContext, (context) => context.getStudent);
  const fetchStudents = useContextSelector(StudentContext, (context) => context.fetchStudents);
  const createStudent = useContextSelector(StudentContext, (context) => context.createStudent);
  const updateStudent = useContextSelector(StudentContext, (context) => context.updateStudent);
  const deleteStudent = useContextSelector(StudentContext, (context) => context.deleteStudent);

  return {
    student,
    students,
    setStudent,
    getStudent,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};
