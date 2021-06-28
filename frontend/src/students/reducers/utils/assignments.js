import produce from "immer";

export const loadSubjectAssignmentsRe = (state, action) => {
  const assignments = action.payload;

  const newState = produce(state, (draft) => {
    draft.currentSubject.assignments = assignments;
    return draft;
  });

  return newState;
};
