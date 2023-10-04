import { produce } from "immer";

import { ActionTypes } from "./actions";
import { CreateStudentInput } from "@dtos/studentDTO";

interface Form {
  currentStep: number;
  student: CreateStudentInput;
}

interface Action {
  type: ActionTypes;
  payload: any;
}

export function formReducer(state: Form, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_STEP:
      return produce(state, (draft) => {
        draft.currentStep = action.payload.currentStep;
      });
    case ActionTypes.ADD_STUDENT:
      return produce(state, (draft) => {
        draft.student = action.payload.student;
      });
    case ActionTypes.ADD_STUDENT_ADDRESS:
      return produce(state, (draft) => {
        draft.student = {
          ...draft.student,
          endereco: action.payload.address,
        };
      });
    case ActionTypes.ADD_STUDENT_COMMENTS:
      return produce(state, (draft) => {
        draft.student = {
          ...draft.student,
          observacao: action.payload.comments,
        };
      });
    case ActionTypes.ADD_STUDENT_PARENTS:
      return produce(state, (draft) => {
        draft.student.responsaveis = action.payload.parents;
      });
    case ActionTypes.ADD_PARENTS_HOUSING_CONDITIONS:
      return {
        ...state,
        student: {
          ...state.student,
          responsaveis: {
            ...state.student.responsaveis,
            condicoes_moradia: action.payload.housingConditions,
          },
        },
      };
      // return produce(state, (draft) => {
      //   draft.student = {
      //     ...state.student,
      //     responsaveis:
      //   };
      // });
    case ActionTypes.ADD_PARENTS_LIFE_CONDITIONS:
      return {
        ...state,
        student: {
          ...state.student,
          responsaveis: {
            ...state.student.responsaveis,
            condicoes_vida: action.payload.livingConditions,
          },
        },
      };
    default:
      return state;
  }
};
