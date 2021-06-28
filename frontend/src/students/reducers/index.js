import { connect } from "react-redux";
import {
  LOAD_CLASSROOM,
  LOAD_SUBJECT_ASSIGNMENTS,
  LOAD_SUBJECT_NOTES,
  SET_CURRENT_SUBJECT,
} from "../actions/types";
import { loadSubjectAssignmentsRe } from "./utils/assignments";
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
  console.log(action);
  switch (action.type) {
    case LOAD_CLASSROOM:
      return loadClassroomRe(state, action);

    case SET_CURRENT_SUBJECT:
      return setCurrentSubjectRe(state, action);

    case LOAD_SUBJECT_NOTES:
      return loadSubjectNotesRe(state, action);

    case LOAD_SUBJECT_ASSIGNMENTS:
      console.log(action);
      return loadSubjectAssignmentsRe(state, action);

    default:
      return state;
  }
};

export default ClassroomReducer;
