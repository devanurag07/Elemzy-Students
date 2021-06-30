import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Choices from "../../components/ChoicesFormC/Choices";
import {
  createNotification,
  submitAssignment,
} from "../../actions/classroomActions";

import {} from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiMobileStepper-root": {
      display: "flex",
      justfiyContent: "space-between",
      width: "100%",
    },

    "& .MuiDialogTitle-root": {
      display: "flex",
      justifyContent: "flex-end",
      padding: "4px",
    },
  },
}));

const QuizForm = ({ assignment, formOpen, setFormOpen }) => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let questions = assignment.questions;
  questions = questions ? questions : [];

  const formData = [];
  for (let question of questions) {
    formData.push({ question: question.question, id: question.id, answer: "" });
  }

  const [questionsFormData, setQuestionFormData] = useState(formData);

  const currentQuestion =
    questions.length > activeStep ? questions[activeStep] : { choices: [] };

  let crntQuestionFormData = questionsFormData.find(
    (questionFormData) => questionFormData.id === currentQuestion.id
  );

  crntQuestionFormData = crntQuestionFormData ? crntQuestionFormData : {};

  useEffect(() => {
    const formData = [];
    for (let question of questions) {
      formData.push({
        question: question.question,
        id: question.id,
        answer: "",
      });
    }
    setQuestionFormData(formData);
  }, [assignment.questions]);

  const submitBtnHandler = () => {
    submitAssignment(
      {
        assignment_id: assignment.id,
        questions: questionsFormData,
      },
      onSuccess
    );
  };

  const onSuccess = (gradedAssignmentObj) => {
    const { points, total_marks } = gradedAssignmentObj;
    createNotification(`You got ${points}/${total_marks}.`, {
      variant: "success",
    });

    setFormOpen(false);
  };

  const classes = useStyles();

  return (
    <Dialog open={formOpen} className={classes.root}>
      <DialogTitle id="form-dialog-title">
        <IconButton onClick={() => setFormOpen(false)}>
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">{currentQuestion.question}</Typography>

        <Choices
          choices={currentQuestion.choices}
          crntQuestionFormData={crntQuestionFormData}
          questionsFormData={questionsFormData}
          setQuestionsFormData={setQuestionFormData}
        />
      </DialogContent>

      <DialogActions>
        <MobileStepper
          variant="dots"
          steps={questions.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === questions.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />

        <Button
          variant="contained"
          color="primary"
          disabled={activeStep !== questions.length - 1}
          onClick={submitBtnHandler}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizForm;
