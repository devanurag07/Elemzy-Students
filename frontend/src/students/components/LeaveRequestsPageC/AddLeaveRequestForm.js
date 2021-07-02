import React, { useState, useRef } from "react";
import "date-fns";
import {
  Grid,
  makeStyles,
  TextField,
  FormControl,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { addLeaveRequest } from "../../actions/classroomActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "23rem",
    "& .fieldError": {
      border: "2px solid red",
    },
    "& .MuiFormControl-root": {
      margin: "0.2em 0em",
    },
    "& .dateField": {
      padding: "0.2em",
      fontFamily: "Poppins",
      display: "block",
      fontWeight: 505,
      width: "100%",
    },
  },
  selectDocument: {
    border: "2px solid orange",
    background: "orange",
    color: "white",
    padding: "0.6em",
    margin: "0.3em 0em",
    borderRadius: "0.2em",
  },
}));

function AddLeaveRequestForm() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();

  const initFormData = {
    from_date: "",
    to_date: "",
    reason_title: "",
    reason_description: "",
    document_file: null,
  };

  const [formData, setFormData] = useState(initFormData);
  const documentInputRef = useRef(null);

  // Error handling
  const [formErrors, setFormErrors] = useState({});

  const hasFieldErr = (fieldname) => {
    if (formErrors[fieldname]) {
      return true;
    }
    return false;
  };

  const getFieldErrMsg = (fieldname) => {
    if (hasFieldErr(fieldname)) {
      const fieldErrMsg = formErrors[fieldname];
      return fieldErrMsg;
    }
    return "";
  };

  const onFieldChange = (event) => {
    const fieldname = event.target.name;
    const fieldvalue = event.target.value;
    setFormData({ ...formData, [fieldname]: fieldvalue });
    console.log(formData);
  };

  const submitBtnHandler = () => {
    addLeaveRequest(formData, setFormErrors);
  };

  const onLeaveDocumentChange = (event) => {
    const files = event.target.files;
    if (files.length >= 1) {
      const file = files[0];
      setFormData({ ...formData, document_file: file });
    } else {
      setFormData({ ...formData, document_file: null });
    }
  };

  const selectDocumentClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between" spacing={5}>
            <Grid item sm={6} className={classes.dateInputContainer}>
              <label htmlFor="from_date">From</label>
              <input
                type="date"
                name="from_date"
                onChange={onFieldChange}
                value={formData.from_date}
                className={`dateField ${
                  hasFieldErr("from_date") ? "fieldError " : ""
                }`}
              />
            </Grid>

            <Grid item sm={6}>
              <label htmlFor="to_date">To</label>
              <input
                type="date"
                name="to_date"
                onChange={onFieldChange}
                value={formData.to_date}
                className={`dateField ${
                  hasFieldErr("to_date") ? "fieldError " : ""
                }`}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid container>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Reason Title"
              name="reason_title"
              variant="outlined"
              onChange={onFieldChange}
              value={formData.reason_title}
              fullWidth
              error={hasFieldErr("reason_title")}
              helperText={getFieldErrMsg("reason_title")}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Reason Description"
              multiline
              rows={5}
              fullWidth
              onChange={onFieldChange}
              variant="outlined"
              value={formData.reason_description}
              name="reason_description"
              error={hasFieldErr("reason_description")}
              helperText={getFieldErrMsg("reason_description")}
            />
          </FormControl>
        </Grid>

        <Grid item sm={12}>
          <FormControl fullWidth>
            <input
              type="file"
              name="leave_document"
              onChange={onLeaveDocumentChange}
              ref={documentInputRef}
              style={{ display: "none" }}
            />
            <div
              className={`${classes.selectDocument} ${
                hasFieldErr("document_file") ? "fieldError" : ""
              }`}
              onClick={selectDocumentClick}
            >
              {formData.document_file
                ? formData.document_file.name
                : "Select Document"}
            </div>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" onClick={submitBtnHandler}>
        Submit
      </Button>
    </div>
  );
}

export default AddLeaveRequestForm;
