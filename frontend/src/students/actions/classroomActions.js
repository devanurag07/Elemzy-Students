import axios from "axios";
import store from "../../store";
import {
  LOAD_CLASSROOM,
  LOAD_SUBJECT_ASSIGNMENTS,
  LOAD_SUBJECT_NOTES,
  SET_CURRENT_SUBJECT,
} from "./types";

const dispatch = store.dispatch;
const API_URL = "http://127.0.0.1:8001";

export const getTokenConfig = () => {
  const authState = store.getState().auth;

  const token = authState.token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  } else {
    let localtoken = localStorage.getItem("token");
    if (localtoken) config.headers["Authorization"] = `Token ${localtoken}`;
  }

  return config;
};

// Loading The Classroom
export const loadClassroom = () => {
  const config = getTokenConfig();

  axios.get(`${API_URL}/api/student/classroom`, config).then((resp) => {
    if (resp.status == 200) {
      const classroom_data = resp.data;
      dispatch({ type: LOAD_CLASSROOM, payload: classroom_data });
    }
  });
};

// Selecting current Subject
export const setCurrentSubject = (subjectId) => {
  dispatch({
    type: SET_CURRENT_SUBJECT,
    payload: subjectId,
  });
};

export const loadSubjectNotes = (subject_pk) => {
  const config = getTokenConfig();

  axios
    .get(
      `${API_URL}/api/student/classroom/notes?subject_pk=${subject_pk}`,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        const notes_list = resp.data;
        dispatch({
          type: LOAD_SUBJECT_NOTES,
          payload: notes_list,
        });
      }
    });
};

export const loadSubjectAssignments = (subject_pk) => {
  const config = getTokenConfig();

  axios
    .get(
      `${API_URL}/api/student/classroom/assignments?subject_pk=${subject_pk}`,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        const assignments_list = resp.data;
        dispatch({
          type: LOAD_SUBJECT_ASSIGNMENTS,
          payload: assignments_list,
        });
      }
    });
};
