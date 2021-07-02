import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import AddLeaveRequestForm from "../../components/LeaveRequestsPageC/AddLeaveRequestForm";

const LeaveRequestsPage = () => {
  return (
    <div>
      Leave Requests
      <Grid container>
        <Grid item sm={6}>
          <AddLeaveRequestForm />
        </Grid>
        <Grid item sm={6}></Grid>
      </Grid>
    </div>
  );
};

export default LeaveRequestsPage;
