import produce from "immer";

export const loadSubjectAssignmentsRe = (state, action) => {
  const assignments = action.payload;

  const newState = produce(state, (draft) => {
    draft.currentSubject.assignments = assignments;
    return draft;
  });

  return newState;
};

export const removeAssignmentRe = (state, action) => {
  const assignment_id = action.payload;

  const newState = produce(state, (draft) => {
    const assignments = draft.currentSubject.assignments;
    draft.currentSubject.assignments = assignments.filter((assignment) => {
      return assignment.id !== assignment_id;
    });
  });

  return newState;
};
