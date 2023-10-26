import { ReactNode, useEffect, useReducer } from "react";
import { createContext } from "use-context-selector";

import {
  addStudentAction,
  resetStudentAction,
  addNewStudentAction,
  setCurrentStepAction,
  addStudentAddressAction,
  addStudentParentsAction,
  addStudentCommentsAction,
  addParentsConditionsAction,
} from "src/reducers/form/actions";
import { CreateAddressInput } from "@dtos/addressDTO";
import { formReducer } from "../reducers/form/reducer";
import { CreateParentsInput, CreateConditionsInput } from "@dtos/parentsDTO";
import { Student, CreateCommentsProps, CreateStudentInput } from "@dtos/studentDTO";

interface FormContextType {
  currentStep: number;
  resetStudent: () => void;
  student: CreateStudentInput;
  addStudent: (data: Student) => void;
  setCurrentStep: (currentStep: number) => void;
  addNewStudent: (data: CreateStudentInput) => void;
  addStudentComments: (data: CreateCommentsProps) => void;
  addStudentAddress: (data: CreateAddressInput) => void;
  addStudentParents: (data: CreateParentsInput[]) => void;
  addStudentParentsConditions: (data: CreateConditionsInput[]) => void;
}

export const FormContext = createContext<FormContextType>(
  {} as FormContextType,
);

interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const initialData = {
    currentStep: 1,
    student: {} as CreateStudentInput,
  };
  const [formState, dispatch] = useReducer(
    formReducer,
    initialData,
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@educa365:form-state-1.0.0",
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      } else {
        return initialData;
      }
    },
  );
  const { student, currentStep } = formState;

  useEffect(() => {
    if (formState) {
      const stateJSON = JSON.stringify(formState);

      localStorage.setItem("@educa365:form-state-1.0.0", stateJSON);
    } else {
      const stateJSON = JSON.stringify(initialData);

      localStorage.setItem("@educa365:form-state-1.0.0", stateJSON);
    }
  }, [formState]);

  console.log("Student: ", student);

  const setCurrentStep = (currentStep: number) => {
    dispatch(setCurrentStepAction(currentStep));
  };

  const addStudent = (data: Student) => {
    dispatch(addStudentAction(data));
  };

  const addStudentAddress = (data: CreateAddressInput) => {
    dispatch(addStudentAddressAction(data));
  };

  const addStudentComments = (data: CreateCommentsProps) => {
    dispatch(addStudentCommentsAction(data));
  };

  const addStudentParents = (data: CreateParentsInput[]) => {
    dispatch(addStudentParentsAction(data));
  };

  const addStudentParentsConditions = (data: CreateConditionsInput[]) => {
    dispatch(addParentsConditionsAction(data));
  };

  const addNewStudent = (data: CreateStudentInput) => {
    dispatch(addNewStudentAction(data));
  };
  const resetStudent = () => {
    dispatch(resetStudentAction());
  };

  return (
    <FormContext.Provider
      value={{
        student,
        addStudent,
        currentStep,
        resetStudent,
        addNewStudent,
        setCurrentStep,
        addStudentAddress,
        addStudentParents,
        addStudentComments,
        addStudentParentsConditions,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
