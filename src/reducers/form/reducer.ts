import { produce } from "immer";

import { ActionTypes } from "./actions";
import { CreateStudentInput } from "@dtos/studentDTO";

interface Form {
  currentStep: number;
  student: CreateStudentInput;
}

interface Action {
  type: ActionTypes;
  payload?: any;
}

export function formReducer(state: Form, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_STEP:
      return produce(state, (draft) => {
        draft.currentStep = action.payload.currentStep;
      });
    case ActionTypes.RESET_STUDENT:
      return produce(state, (draft) => {
        draft.student = {} as CreateStudentInput;
        draft.currentStep = 1;
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
          observacoesEducando: action.payload.comments,
        };
      });
    case ActionTypes.ADD_STUDENT_PARENTS:
      return produce(state, (draft) => {
        draft.student = {
          ...draft.student,
          responsaveis: action.payload.parents,
        };
      });
    case ActionTypes.ADD_PARENTS_CONDITIONS:
      if (state.student.responsaveis.length === 1 && action.payload.conditions.length === 1) {
        const indexResponsavel1 = 0;

        return produce(state, (draft) => {
          draft.student = {
            ...draft.student,
            responsaveis: [
              {
                ...draft.student.responsaveis[indexResponsavel1],
                condicaoMoradia: action.payload.conditions[indexResponsavel1].condicaoMoradia,
                condicaoVida: action.payload.conditions[indexResponsavel1].condicaoVida,
              },
            ],
          };
        });
      }

      if (state.student.responsaveis.length === 2 && action.payload.conditions.length === 1) {
        const indexResponsavel1 = 0;

        return produce(state, (draft) => {
          draft.student = {
            ...draft.student,
            responsaveis: [
              {
                ...draft.student.responsaveis[indexResponsavel1],
                condicaoVida: action.payload.conditions[indexResponsavel1].condicaoVida,
                condicaoMoradia: action.payload.conditions[indexResponsavel1].condicaoMoradia,
              },
              {
                ...draft.student.responsaveis[1],
                condicaoVida: action.payload.conditions[indexResponsavel1].condicaoVida,
                condicaoMoradia: action.payload.conditions[indexResponsavel1].condicaoMoradia,
              },
            ],
          };
        });
      }

      if (state.student.responsaveis.length === 2 && action.payload.conditions.length === 2) {
        const indexResponsavel1 = 0;
        const indexResponsavel2 = 1;

        return produce(state, (draft) => {
          draft.student = {
            ...draft.student,
            responsaveis: [
              {
                ...draft.student.responsaveis[indexResponsavel1],
                condicaoVida: action.payload.conditions[indexResponsavel1].condicaoVida,
                condicaoMoradia: action.payload.conditions[indexResponsavel1].condicaoMoradia,
              },
              {
                ...draft.student.responsaveis[indexResponsavel2],
                condicaoVida: action.payload.conditions[indexResponsavel2].condicaoVida,
                condicaoMoradia: action.payload.conditions[indexResponsavel2].condicaoMoradia,
              },
            ],
          };
        });
      }

      return state;
    default:
      return state;
  }
}
