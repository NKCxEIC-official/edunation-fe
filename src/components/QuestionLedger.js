import { Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

function QuestionLedger({ btnCount, onclick, activeIndex, visitedQuestions }) {
  const theme = useTheme();
  function getColor(activeIndex, index) {
    if (activeIndex === index) {
      return 'danger';
    }
    return 'primary';
  }

  function getVariant(activeIndex, index) {
    if (activeIndex === index) return 'contained';
    if (visitedQuestions[index]) {
      return 'contained';
    }
    return 'outlined';
  }

  return (
    <Card>
      <CardHeader title="Questions" />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <div
              style={{
                height: '10px',
                width: '10px',
                borderRadius: '10px',
                border: `1px solid ${theme.palette.primary.dark}`,
              }}
            />
            <Typography variant="subtitle2">Not Visited</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <div
              style={{
                backgroundColor: theme.palette.primary.dark,
                height: '10px',
                width: '10px',
                borderRadius: '10px',
              }}
            />
            <Typography variant="subtitle2"> Visited</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <div
              style={{
                backgroundColor: theme.palette.danger.dark,
                height: '10px',
                width: '10px',
                borderRadius: '10px',
              }}
            />
            <Typography variant="subtitle2"> Selected</Typography>
          </Stack>
        </Stack>
        {Array.from(Array(btnCount), (e, i) => (
          <Button
            variant={getVariant(activeIndex, i)}
            sx={{ p: 0, m: 1, borderRadius: '100%', height: '40px', width: '40px', minWidth: 'auto' }}
            component="label"
            key={i}
            onClick={() => onclick(i)}
            color={getColor(activeIndex, i)}
          >
            {i + 1}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export default QuestionLedger;
