import {
  LOAD_CLASSROOM,
  LOAD_SUBJECT_NOTES,
  SET_CURRENT_SUBJECT,
} from "../actions/types";
import { loadClassroomRe, setCurrentSubjectRe } from "./utils/classroom";
import { loadSubjectNotesRe } from "./utils/notes";

const initialState = {
  classroom: {
    semesters: [],
  },
  currentSubject: {
    notes: [],
    documents: [],
    assignments: [],
  },
  workDate: null,
  timetable: [],
  ranking_data: [],
  results: [],
};

const ClassroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLASSROOM:
      return loadClassroomRe(state, action);

    case SET_CURRENT_SUBJECT:
      return setCurrentSubjectRe(state, action);

    case LOAD_SUBJECT_NOTES:
      return loadSubjectNotesRe(state, action);
    default:
      return state;
  }
};

export default ClassroomReducer;
