import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

function ShowQuestion({
  question: { questionTitle, questionDescription, mcq, options, answer },
  activeIndex,
  handleAnswer,
}) {
  return (
    <Card>
      <CardHeader title={questionTitle} subheader={questionDescription} />
      <CardContent>
        {mcq ? (
          <RadioGroup
            value={answer || ''}
            name={`radio-buttons-${activeIndex}`}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            {options &&
              options.length > 0 &&
              options.map(({ label }, key) => (
                <FormControlLabel value={label} control={<Radio />} label={label} key={key} />
              ))}
          </RadioGroup>
        ) : (
          <TextField
            id="outlined-basic"
            label="Answer in brief"
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            defaultValue={answer}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default ShowQuestion;
