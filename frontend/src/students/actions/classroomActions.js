import axios from "axios";
import store from "../../store";
import {
  CLEAR_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  LOAD_CLASSROOM,
  LOAD_SUBJECT_ASSIGNMENTS,
  LOAD_SUBJECT_EXAMS_RESULT,
  LOAD_SUBJECT_NOTES,
  REMOVE_ASSIGNMENT,
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

  // config["params"] = {
  //   subject_pk: subject_pk,
  // };

  const loadAssignmentUrl = `${API_URL}/api/student/classroom/assignments_list?subject_pk=${subject_pk}`;
  console.log(loadAssignmentUrl);

  axios.get(loadAssignmentUrl, config).then((resp) => {
    if (resp.status == 200) {
      const assignments_list = resp.data;
      dispatch({
        type: LOAD_SUBJECT_ASSIGNMENTS,
        payload: assignments_list,
      });
    }
  });
};

export const submitAssignment = (assignmentFormData, onSuccess) => {
  const config = getTokenConfig();

  axios
    .post(
      `${API_URL}/api/student/classroom/gradedassignment`,
      assignmentFormData,
      config
    )
    .then((resp) => {
      if (resp.status == 201) {
        const gradedAssignmentObj = resp.data;
        const assignment_id = gradedAssignmentObj.assignment;

        onSuccess(gradedAssignmentObj);
        removeAssignment(assignment_id);
      }
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeAssignment = (assignmentId) => {
  dispatch({
    type: REMOVE_ASSIGNMENT,
    payload: assignmentId,
  });
};

// Notifications

export const createNotification = (msg, options) => {
  dispatch({
    type: CREATE_NOTIFICATION,
    msg: msg,
    options: options,
  });
};

export const clearNotifications = (notificationObj) => {
  dispatch({
    type: CLEAR_NOTIFICATIONS,
  });
};

export const sendRankingDocumentRequest = (
  formData,
  setFormErrors,
  onSuccess
) => {
  const config = getTokenConfig();

  const formDataObj = new FormData();

  for (let fieldname in formData) {
    if (formData[fieldname] == null) {
      formDataObj.append(fieldname, "");
      continue;
    }
    formDataObj.append(fieldname, formData[fieldname]);
  }

  console.log(formData);
  console.log(formDataObj);
  axios
    .post(
      `${API_URL}/api/student/classroom/rankingdocuments/`,
      formDataObj,
      config
    )
    .then((resp) => {
      if (resp.status == 201) {
        onSuccess();
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 400) {
          console.log(err.response.data);
          const response_data = err.response.data;
          if (response_data.errors) {
            const errors = response_data.errors;
            setFormErrors(errors);
          }
        }
      }
    });
};

export const loadSubjectExamResults = (subject_pk) => {
  const config = getTokenConfig();

  const loadSubjectResultsURL = `${API_URL}/api/student/classroom/subjectexamsresult?subject_pk=${subject_pk}`;

  axios.get(loadSubjectResultsURL, config).then((resp) => {
    if (resp.status == 200) {
      const subectResults = resp.data;
      dispatch({
        type: LOAD_SUBJECT_EXAMS_RESULT,
        payload: subectResults,
      });
    }
  });
};
