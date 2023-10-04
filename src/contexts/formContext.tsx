import { ReactNode, useEffect, useReducer } from "react";
import { createContext } from "use-context-selector";

import {
  ActionTypes,
  addStudentAction,
  addNewStudentAction,
  addStudentAddressAction,
  addStudentParentsAction,
  addStudentCommentsAction,
  addParentsLivingConditionsAction,
  addParentsHousingConditionsAction,
  setCurrentStepAction,
} from "src/reducers/form/actions";
import {
  CreateParentsInput,
  HousingConditionsProps,
  LivingConditionsProps,
} from "@dtos/parentsDTO";
import { CreateAddressInput } from "@dtos/addressDTO";
import { formReducer } from "../reducers/form/reducer";
import { Student, CommentsProps, CreateStudentInput } from "@dtos/studentDTO";

interface Action {
  type: ActionTypes;
  payload: any;
}

interface FormContextType {
  currentStep: number;
  student: CreateStudentInput;
  addStudent: (data: Student) => void;
  setCurrentStep: (currentStep: number) => void;
  addNewStudent: (data: CreateStudentInput) => void;
  addStudentComments: (data: CommentsProps) => void;
  addStudentAddress: (data: CreateAddressInput) => void;
  addStudentParents: (data: CreateParentsInput) => void;
  addStudentParentsLivingConditions: (data: LivingConditionsProps) => void;
  addStudentParentsHousingConditions: (data: HousingConditionsProps) => void;
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
  const [formState, dispatch] = useReducer(formReducer, initialData, () => {
    const storedStateAsJSON = localStorage.getItem(
      "@educa365:form-state-1.0.0",
    );

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }
  });

  const { student, currentStep } = formState;

  useEffect(() => {
    const stateJSON = JSON.stringify(formState);

    localStorage.setItem("@educa365:form-state-1.0.0", stateJSON);
  }, [formState]);

  const setCurrentStep = (currentStep: number) => {
    dispatch(setCurrentStepAction(currentStep));
  };

  const addStudent = (data: Student) => {
    dispatch(addStudentAction(data));
  };

  const addStudentAddress = (data: CreateAddressInput) => {
    dispatch(addStudentAddressAction(data));
  };

  const addStudentComments = (data: CommentsProps) => {
    dispatch(addStudentCommentsAction(data));
  };

  const addStudentParents = (data: CreateParentsInput) => {
    dispatch(addStudentParentsAction(data));
  };

  const addStudentParentsHousingConditions = (data: HousingConditionsProps) => {
    dispatch(addParentsHousingConditionsAction(data));
  };

  const addStudentParentsLivingConditions = (data: LivingConditionsProps) => {
    dispatch(addParentsLivingConditionsAction(data));
  };

  const addNewStudent = (data: CreateStudentInput) => {
    dispatch(addNewStudentAction(data));
  };

  return (
    <FormContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
