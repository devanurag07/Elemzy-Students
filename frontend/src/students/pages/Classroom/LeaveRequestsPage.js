import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import AddLeaveRequestForm from "../../components/LeaveRequestsPageC/AddLeaveRequestForm";
import { loadLeaveRequests } from "../../actions/classroomActions";
import { MAIN_COLOR_LIGHT } from "../../usefulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {},
  previousRequestsH1: {
    fontSize: "1.3em",
    fontWeight: "505",
    fontFamily: "Poppins",
    marginBottom: "0.5em",
  },
  previousRequestsDiv: {
    padding: "1em",
  },
}));

const LeaveRequestsPage = () => {
  const [leaverequests, setLeaverequests] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    loadLeaveRequests(setLeaverequests);
  }, [""]);

  return (
    <div>
      Leave Requests
      <Grid container>
        <Grid item sm={6}>
          <AddLeaveRequestForm />
        </Grid>
        <Grid item sm={6}>
          <div className={classes.previousRequestsDiv}>
            <div className={classes.previousRequestsH1}>Previous Requests</div>
            {leaverequests.map((leaverequest) => {
              return <LeaveRequest leaverequest={leaverequest} />;
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaveRequestsPage;

const useStyles2 = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "black",
    background: MAIN_COLOR_LIGHT,
    padding: "0.2em 0.8em",
  },
  titleText: {
    fontSize: "1rem",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  reasonText: {
    fontSize: "0.8rem",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  leaverequestStatusDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "end",
  },
}));

const LeaveRequest = ({ leaverequest }) => {
  const classes = useStyles2();

  const { is_accepted, is_pending } = leaverequest;

  const getLeaveRequestStatus = () => {
    const style = {
      padding: "0.2em 0.3em",
      borderRadius: "0.2em",
      color: "white",
    };

    let statusText = "None";
    if (is_pending) {
      style.background = "gray";
      statusText = "Pending";
    } else {
      if (is_accepted) {
        style.background = "green";
        statusText = "Accepted";
      } else {
        style.background = "red";
        statusText = "Rejected";
      }
    }

    return <span style={style}>{statusText}</span>;
  };

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item sm sm={8}>
          <Typography variant="subtitle1" className={classes.titleText}>
            {leaverequest.reason_title}
          </Typography>
          <div className={classes.reasonText}>
            {" "}
            {leaverequest.reason_description}
          </div>
        </Grid>
        <Grid item sm={4}>
          <Typography>leave request for - </Typography>
          <div className={classes.leaverequestStatusDiv}>
            {getLeaveRequestStatus()}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
