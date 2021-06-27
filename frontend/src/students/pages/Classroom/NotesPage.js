import React, { useEffect } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { loadSubjectNotes } from "../../actions/classroomActions";

const noteStyles = makeStyles({
  root: {
    fontFamily: "Ubuntu",
    minHeight: "10vh",
    padding: "1em",
    boxShadow: "none",
    background: "#ff990070",
  },
  noteTitle: {
    textTransform: "capitalize",
    // fontWeight:"200",
    fontSize: "1.2rem",
    color: "black",
    marginBottom: "0.2em",
  },
  description: {
    fontSize: "0.9em",
    color: "gray",
  },
});

function Note({ title, description }) {
  const classes = noteStyles();

  return (
    <Paper elevation={1} className={classes.root}>
      <Typography
        component="div"
        variant="subtitle1"
        className={classes.noteTitle}
      >
        {title}
      </Typography>

      <Typography
        component="div"
        variant="subtitle2"
        className={classes.description}
      >
        {description}
      </Typography>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    "& *": {
      fontFamily: "Poppins",
    },
  },
  notesPageHeading: {
    fontFamily: "Poppins",
    fontSize: "1.2rem",
    fontWeight: 505,
  },
  notesContainer: {
    minHeight: "50vh",
    marginTop: "1em",
  },
}));

const NotesPage = () => {
  const currentSubject = useSelector((state) => state.classroom.currentSubject);
  const notes_list = useSelector(
    (state) => state.classroom.currentSubject.notes
  );

  useEffect(() => {
    const subject_pk = currentSubject.id;
    if (subject_pk) {
      loadSubjectNotes(subject_pk);
    }
  }, [currentSubject.id]);

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" className={classes.notesPageHeading}>
          Notes
        </Typography>
        <Grid container className={classes.notesContainer}>
          {notes_list.map((note) => {
            return (
              <Grid item sm={3}>
                <Note title={note.title} description={note.description} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
};

export default NotesPage;
