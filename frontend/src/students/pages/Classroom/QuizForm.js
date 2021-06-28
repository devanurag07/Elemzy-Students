import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  useTheme,
} from "@material-ui/core";

import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Choices from "../../components/ChoicesFormC/Choices";

const QuizForm = ({ assignment }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const theme = useTheme();

  let questions = assignment.questions;
  questions = questions ? questions : [];

  const currentQuestion =
    questions.length > activeStep ? questions[activeStep] : { choices: [] };

  const formData = [];
  for (let question of questions) {
    formData.push({ question: question.question, id: question.id, answer: "" });
  }

  const [questionsFormData, setQuestionFormData] = useState(formData);

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
  }, [questions]);
  return (
    <Dialog open={true}>
      <DialogContent>
        <Typography variant="body1">{currentQuestion.question}</Typography>

        <Choices
          choices={currentQuestion.choices}
          crntQuestionFormData={crntQuestionFormData}
          questionsFormData={questionsFormData}
          setQuestionsFormData={setQuestionFormData}
        />

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
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default QuizForm;
