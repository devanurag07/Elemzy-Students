import React from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRandomColor } from "../../usefulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    marginLeft: "10px",
    height: "100%",
  },
  heading: {
    fontWeight: "505",
    fontFamily: "Poppins",
    fontSize: "1.2em",
  },
  subHeading: {
    fontSize: "0.6em",
    color: "gray",
  },
}));

const TimeTable = () => {
  const classes = useStyles();

  const timetable = useSelector(
    (state) => state.classroom.dashboard_data.timetable
  );

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        TimeTable
      </Typography>
      <Typography variant="subtitle1" className={classes.subHeading}>
        28 January 2021
      </Typography>

      <Grid container style={{ height: "95%" ,padding:"2em 0em"}}>
        {timetable.map((entry) => {
          return (
            <Grid item sm={10}>
              <TimeTableItem timetableEntry={entry} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TimeTable;

const useStyles2 = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    // padding: "0.3em 1em",
    marginTop: "0.3em",
    borderRadius: "0.1em",
  },
  cardHeading: {
    fontSize: "0.9em",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  cardFooter: {
    fontSize: "0.7em",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  cardStartTimeLbl: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

const TimeTableItem = ({ timetableEntry }) => {
  const classes = useStyles2();

  const color = getRandomColor();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item sm={3} className={classes.cardStartTimeLbl}>
          {timetableEntry.start_time.slice(0, 5)}
        </Grid>

        <Grid
          item
          sm={9}
          style={{
            background: color.background,
            color: color.foreground,
            padding: "0.1em 1em",
            borderRadius: "1em",
          }}
        >
          <Grid container>
            <Grid item sm={12}>
              <Typography variant="subtitle1" className={classes.cardHeading}>
                {timetableEntry.subject_name}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.cardFooter}>
                {timetableEntry.start_time.slice(0, 5)} To{" "}
                {timetableEntry.finish_time.slice(0, 5)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
