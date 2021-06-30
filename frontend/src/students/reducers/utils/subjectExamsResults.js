export const loadSujectExamsResultRe = (state, action) => {
  const subject_exams_results = action.payload;

  return {
    ...state,
    currentSubject: { ...state.currentSubject, subject_exams_results },
  };
};
