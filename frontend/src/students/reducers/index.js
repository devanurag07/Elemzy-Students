import { connect } from "react-redux";
import {
  CLEAR_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  LOAD_CLASSROOM,
  LOAD_SUBJECT_ASSIGNMENTS,
  LOAD_SUBJECT_EXAMS_RESULT,
  LOAD_SUBJECT_NOTES,
  REMOVE_ASSIGNMENT,
  SET_CURRENT_SUBJECT,
} from "../actions/types";
import {
  loadSubjectAssignmentsRe,
  removeAssignmentRe,
} from "./utils/assignments";
import { loadClassroomRe, setCurrentSubjectRe } from "./utils/classroom";
import { loadSubjectNotesRe } from "./utils/notes";
import { loadSujectExamsResultRe } from "./utils/subjectExamsResults";

const initialState = {
  classroom: {
    semesters: [],
  },
  currentSubject: {
    notes: [],
    documents: [],
    assignments: [],
    subject_exams_results: [],
  },
  workDate: null,
  timetable: [],
  ranking_data: [],
  results: [],
  notifications: [],
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

    case REMOVE_ASSIGNMENT:
      return removeAssignmentRe(state, action);

    case CREATE_NOTIFICATION:
      const notification = { msg: action.msg, options: action.options };
      return {
        ...state,
        notifications: [...state.notifications, notification],
      };

    case CLEAR_NOTIFICATIONS:
      return { ...state, notifications: [] };

    case LOAD_SUBJECT_EXAMS_RESULT:
      return loadSujectExamsResultRe(state, action);
    default:
      return state;
  }
};

export default ClassroomReducer;
