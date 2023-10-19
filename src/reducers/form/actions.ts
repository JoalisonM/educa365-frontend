import { CreateAddressInput } from "@dtos/addressDTO";
import { CreateParentsInput, CreateConditionsInput } from "@dtos/parentsDTO";
import { Student, CreateCommentsProps, CreateStudentInput } from "@dtos/studentDTO";

export enum ActionTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  ADD_NEW_STUDENT = "ADD_NEW_STUDENT",
  ADD_STUDENT = "ADD_STUDENT",
  RESET_STUDENT = "RESET_STUDENT",
  ADD_STUDENT_ADDRESS = "ADD_STUDENT_ADDRESS",
  ADD_STUDENT_COMMENTS = "ADD_STUDENT_COMMENTS",
  ADD_STUDENT_PARENTS = "ADD_STUDENT_PARENTS",
  ADD_PARENTS_CONDITIONS = "ADD_PARENTS_CONDITIONS",
}

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
}

export function resetStudentAction() {
  return {
    type: ActionTypes.RESET_STUDENT,
  };
}

export function addStudentAction(student: Student) {
  return {
    type: ActionTypes.ADD_STUDENT,
    payload: {
      student,
    },
  };
}

export function addStudentAddressAction(address: CreateAddressInput) {
  return {
    type: ActionTypes.ADD_STUDENT_ADDRESS,
    payload: {
      address,
    },
  };
}

export function addStudentCommentsAction(comments: CreateCommentsProps) {
  return {
    type: ActionTypes.ADD_STUDENT_COMMENTS,
    payload: {
      comments,
    },
  };
}

export function addStudentParentsAction(parents: CreateParentsInput[]) {
  return {
    type: ActionTypes.ADD_STUDENT_PARENTS,
    payload: {
      parents,
    },
  };
}

export function addParentsConditionsAction(conditions: CreateConditionsInput[]) {
  return {
    type: ActionTypes.ADD_PARENTS_CONDITIONS,
    payload: {
      conditions,
    },
  };
}
