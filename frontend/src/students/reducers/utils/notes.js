import { produce } from "immer";

export const loadSubjectNotesRe = (state, action) => {
  const notes_list = action.payload;

  const newState = produce(state, (draft) => {
    draft.currentSubject.notes = notes_list;
  });

  return newState;
};
