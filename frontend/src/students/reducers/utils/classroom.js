export const loadClassroomRe = (state, action) => {
  const classroom_data = action.payload;
  return { ...state, classroom: classroom_data };
};

export const setCurrentSubjectRe = (state, action) => {
  const subjectId = action.payload;

  for (let semester of state.classroom.semesters) {
    for (let subject of semester.subjects) {
      if (subject.id == subjectId) {
        return {
          ...state,
          currentSubject: { ...state.currentSubject, ...subject },
        };
      }
    }
  }
  return {
    ...state,
    currentSubject: { notes: [], documents: [], assigments: [] },
  };
};
