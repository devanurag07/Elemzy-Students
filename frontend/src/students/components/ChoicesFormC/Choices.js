import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import produce from "immer";

export default function Choices({
  choices,
  crntQuestionFormData,
  questionsFormData,
  setQuestionsFormData,
}) {
  const handleChange = (event) => {
    const newState = produce(questionsFormData, (draft) => {
      for (let questionForm of draft) {
        if (questionForm.id == crntQuestionFormData.id) {
          questionForm.answer = event.target.value;
        }
      }
    });

    setQuestionsFormData(newState);
  };

  const selectedAnswer = crntQuestionFormData.answer;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Correct Answer</FormLabel>
      <RadioGroup
        name="selectAnswers"
        value={selectedAnswer}
        onChange={handleChange}
      >
        <div className="value">Value {crntQuestionFormData.answer}</div>
        {choices.map((choice) => {
          console.log(choice);

          return (
            <FormControlLabel
              value={choice.title}
              control={<Radio checked={selectedAnswer === choice.title} />}
              label={choice.title}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
