import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { setCurrentSubject } from "../actions/classroomActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      minWidth: "120px",
    },

    "& .MuiSvgIcon-root": {
      color: "#ff6b00",
    },

    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
  },

  currentSubjectLbl: {
    background: "orange",
    color: "white",
    textAlign: "center",
    padding: "0.2em",
    borderRadius: "19px",
    fontWeight: 505,
    fontFamily: "Poppins",
  },
}));

function SubjectSelector() {
  const semesters_list = useSelector(
    (state) => state.classroom.classroom.semesters
  );

  const [semesterId, setSemesterId] = useState(0);

  const handleSemesterChange = (e) => {
    const semester_id = e.target.value;
    setSemesterId(semester_id);
  };

  const getSubjectsList = () => {
    const selectedSemester = semesters_list.find(
      (semester) => semester.id == semesterId
    );

    if (selectedSemester) {
      const subjects_list = selectedSemester.subjects;
      return subjects_list;
    } else {
      return [];
    }
  };

  const subjects_list = getSubjectsList();

  const [subjectId, setSubjectId] = useState(0);

  const handleSubjectChange = (e) => {
    const subject_id = e.target.value;
    setSubjectId(subject_id);
  };

  useEffect(() => {
    setCurrentSubject(subjectId);
    console.log(subjectId);
  }, [subjectId]);

  const classes = useStyles();
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  return (
    <div>
      <Grid
        container
        spacing={3}
        justify="space-around"
        className={classes.root}
      >
        <Grid item sm={6}>
          <FormControl>
            <InputLabel id="semester_select_lbl">Semester</InputLabel>
            <Select
              labelId="semester_select_lbl"
              onChange={handleSemesterChange}
              value={semesterId}
            >
              {semesters_list.map((semester) => {
                return <MenuItem value={semester.id}>{semester.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={6}>
          <FormControl>
            <InputLabel id="subject_select_lbl">Subject</InputLabel>
            <Select
              labelId="subject_select_lbl"
              onChange={handleSubjectChange}
              value={subjects_list.length + 100}
            >
              {subjects_list.map((subject) => {
                return <MenuItem value={subject.id}>{subject.name}</MenuItem>;
              })}

              <MenuItem
                value={subjects_list.length + 100}
                style={{ display: "none" }}
              >
                Subject
              </MenuItem>
            </Select>
          </FormControl>

          <div>
            <Typography variant="body1" className={classes.currentSubjectLbl}>
              {currentSubject.name ? currentSubject.name : "Not Selected"}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SubjectSelector;
