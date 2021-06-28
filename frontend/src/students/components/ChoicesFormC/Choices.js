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
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("Form dat");
    console.log(questionsFormData);

    const newState = produce(questionsFormData, (draft) => {
      for (let questionForm of draft) {
        if (questionForm.id == crntQuestionFormData.id) {
          console.log("hey i am here");
          questionForm.answer = event.target.value;
        }
      }
    });

    setQuestionsFormData(newState);
    console.log(crntQuestionFormData);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Correct Answer</FormLabel>
      <RadioGroup
        name="selectAnswers"
        value={crntQuestionFormData.answer}
        onChange={handleChange}
      >
        {choices.map((choice) => {
          console.log(choice);
          return (
            <FormControlLabel
              value={choice.title}
              control={<Radio />}
              label={choice.title}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
