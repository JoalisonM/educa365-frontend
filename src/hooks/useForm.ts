import { FormContext } from "src/contexts/formContext";
import { useContextSelector } from "use-context-selector";

export const useFormContext = () => {
  const student = useContextSelector(FormContext, (form) => form.student);
  const addStudent = useContextSelector(FormContext, (form) => form.addStudent);
  const currentStep = useContextSelector(FormContext, (form) => form.currentStep);
  const addNewStudent = useContextSelector(FormContext, (form) => form.addNewStudent);
  const setCurrentStep = useContextSelector(FormContext, (form) => form.setCurrentStep);
  const addStudentAddress = useContextSelector(FormContext, (form) => form.addStudentAddress);
  const addStudentParents = useContextSelector(FormContext, (form) => form.addStudentParents);
  const addStudentComments = useContextSelector(FormContext, (form) => form.addStudentComments);
  const addStudentParentsLivingConditions = useContextSelector(
    FormContext, (form) => form.addStudentParentsLivingConditions,
  );
  const addStudentParentsHousingConditions = useContextSelector(
    FormContext, (form) => form.addStudentParentsHousingConditions,
  );

  return {
    student,
    addStudent,
    currentStep,
    addNewStudent,
    setCurrentStep,
    addStudentAddress,
    addStudentParents,
    addStudentComments,
    addStudentParentsLivingConditions,
    addStudentParentsHousingConditions,
  };
};
