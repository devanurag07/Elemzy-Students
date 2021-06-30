import React from "react";
import { useRef, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  Input,
  InputLabel,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  createNotification,
  sendRankingDocumentRequest,
} from "../../actions/classroomActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "54vh",
    "& .MuiFormControl-root": {
      marginBottom: "0.3em",
    },
  },
  documentFieldError: {
    border: "2px solid red",
    padding: "0.3em",
    borderRadius: "0.3em",
    fontFamily: "Poppins",
    fontWeight: "505",
    boxShadow: "0px 0px 2px 0px",
  },

  documentField: {
    padding: "0.3em",
    borderRadius: "0.3em",
    fontFamily: "Poppins",
    fontWeight: "505",
    boxShadow: "0px 0px 2px 0px",
  },

  addDocumentHeading: {
    fontSize: "1.2em",
    fontFamily: "Poppins",
    fontWeight: "505",
    padding: "0.3em 0em",
  },

  uploadBtn: {
    backgroundColor: "#ff6b00",
    color: "white",
    borderRadius: "0.3em",
    fontFamily: "Poppins",
    fontWeight: "505",
    "&:hover": {
      border: "2px solid #ff6b00",
      backgroundColor: "white",
      color: "#ff6b00",
    },
  },
}));

const RankingDocumentForm = () => {
  const initFormData = {
    name: "",
    category: "",
    description: "",
    document: null,
  };

  const [formData, setFormData] = useState(initFormData);
  const inputRef = useRef(null);

  const onDocumentChange = (e) => {
    const files = inputRef.current.files;
    console.log("change");
    console.log(files);
    console.log(files.length);
    if (files.length >= 1) {
      const file = files[0];
      console.log(file);
      setFormData({ ...formData, document: file });
    } else {
      setFormData({ ...formData, document: null });
    }
  };

  const onSelectDocumentClick = () => {
    inputRef.current.click();
  };

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

  const onSuccess = () => {
    createNotification("Document Request Sucessfully Created", {
      variant: "success",
    });
    setFormData(initFormData);
  };

  const onSubmitHandler = () => {
    sendRankingDocumentRequest(formData, setFormErrors, onSuccess);
  };

  const handleFieldChange = (e) => {
    const fieldname = e.target.name;
    const fieldvalue = e.target.value;

    setFormData({ ...formData, [fieldname]: fieldvalue });
  };

  const classes = useStyles();
  return (
    <form action="" className={classes.root}>
      <Typography variant="h5" className={classes.addDocumentHeading}>
        ADD DOCUMENT
      </Typography>

      <Grid container>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Document Name"
              variant="outlined"
              size="small"
              name="name"
              error={hasFieldErr("name")}
              helperText={getFieldErrMsg("name")}
              onChange={handleFieldChange}
              value={formData.name}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Document Category"
              variant="outlined"
              size="small"
              name="category"
              error={hasFieldErr("category")}
              helperText={getFieldErrMsg("category")}
              onChange={handleFieldChange}
              value={formData.category}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Document Description"
              variant="outlined"
              size="small"
              rows={5}
              name="description"
              error={hasFieldErr("description")}
              helperText={getFieldErrMsg("description")}
              onChange={handleFieldChange}
              value={formData.description}
              multiline
              fullWidth
            />
          </FormControl>
        </Grid>

        <Grid item sm={12}>
          <FormControl fullWidth>
            <input
              type="file"
              ref={inputRef}
              onChange={onDocumentChange}
              style={{ display: "none" }}
            />
            <div
              className="upload_document"
              onClick={onSelectDocumentClick}
              className={
                hasFieldErr("document")
                  ? classes.documentFieldError
                  : classes.documentField
              }
            >
              {formData.document ? formData.document.name : "Select Document"}
            </div>
          </FormControl>
        </Grid>

        <Button
          variant="contained"
          size="small"
          onClick={onSubmitHandler}
          className={classes.uploadBtn}
        >
          Upload
        </Button>
        {/* ////Form items close -- x--- */}
      </Grid>
    </form>
  );
};

export default RankingDocumentForm;
