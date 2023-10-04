import { CreateAddressInput } from "@dtos/addressDTO";
import { Student, CommentsProps, CreateStudentInput } from "@dtos/studentDTO";
import { CreateParentsInput, CreateHousingConditionsInput, CreateLivingConditionsInput } from "@dtos/parentsDTO";

export enum ActionTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  ADD_NEW_STUDENT = "ADD_NEW_STUDENT",
  ADD_STUDENT = "ADD_STUDENT",
  ADD_STUDENT_ADDRESS = "ADD_STUDENT_ADDRESS",
  ADD_STUDENT_COMMENTS = "ADD_STUDENT_COMMENTS",
  ADD_STUDENT_PARENTS = "ADD_STUDENT_PARENTS",
  ADD_PARENTS_HOUSING_CONDITIONS = "ADD_PARENTS_HOUSING_CONDITIONS",
  ADD_PARENTS_LIFE_CONDITIONS = "ADD_PARENTS_LIFE_CONDITIONS",
};

export function setCurrentStepAction(currentStep: number) {
  return {
    type: ActionTypes.SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  };
}

export function addNewStudentAction(newStudent: CreateStudentInput) {
  return {
    type: ActionTypes.ADD_STUDENT,
    payload: {
      newStudent,
    },
  };
};

export function addStudentAction(student: Student) {
  return {
    type: ActionTypes.ADD_STUDENT,
    payload: {
      student,
    },
  };
};

export function addStudentAddressAction(address: CreateAddressInput) {
  return {
    type: ActionTypes.ADD_STUDENT_ADDRESS,
    payload: {
      address,
    },
  };
};

export function addStudentCommentsAction(comments: CommentsProps) {
  return {
    type: ActionTypes.ADD_STUDENT_COMMENTS,
    payload: {
      comments,
    },
  };
};

export function addStudentParentsAction(parents: CreateParentsInput[]) {
  return {
    type: ActionTypes.ADD_STUDENT_PARENTS,
    payload: {
      parents,
    },
  };
};

export function addParentsHousingConditionsAction(housingConditions: CreateHousingConditionsInput) {
  return {
    type: ActionTypes.ADD_PARENTS_HOUSING_CONDITIONS,
    payload: {
      housingConditions,
    },
  };
};

export function addParentsLivingConditionsAction(livingConditions: CreateLivingConditionsInput) {
  return {
    type: ActionTypes.ADD_PARENTS_LIFE_CONDITIONS,
    payload: {
      livingConditions,
    },
  };
};
