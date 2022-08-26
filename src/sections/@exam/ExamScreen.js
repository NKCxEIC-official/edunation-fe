import { Button, Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShowQuestion from '../../components/ShowQuestion';
import QuestionLedger from '../../components/QuestionLedger';

function ExamScreen(props) {
  const [questions, setQuestions] = useState([
    {
      questionTitle: 'What is len() in python ?',
      questionDescription:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      mcq: false,
      options: [
        {
          label: 'It returns the length',
          correctAnswer: true,
        },
        {
          label: 'It returns the longitute',
          correctAnswer: true,
        },
        {
          label: 'It returns the null',
          correctAnswer: true,
        },
        {
          label: 'This does not exit',
          correctAnswer: true,
        },
      ],
    },
    {
      questionTitle: 'What is len() in python ?',
      questionDescription:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      mcq: true,
      options: [
        {
          label: 'It returns the length',
          correctAnswer: true,
        },
        {
          label: 'It returns the longitute',
          correctAnswer: true,
        },
        {
          label: 'It returns the null',
          correctAnswer: true,
        },
        {
          label: 'This does not exit',
          correctAnswer: true,
        },
      ],
    },
    {
      questionTitle: 'What is len() in python ?',
      questionDescription:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      mcq: true,
      options: [
        {
          label: 'It returns the length',
          correctAnswer: true,
        },
        {
          label: 'It returns the longitute',
          correctAnswer: true,
        },
        {
          label: 'It returns the null',
          correctAnswer: true,
        },
        {
          label: 'This does not exit',
          correctAnswer: true,
        },
      ],
    },
    {
      questionTitle: 'What is len() in python ?',
      questionDescription:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      mcq: true,
      options: [
        {
          label: 'It returns the length',
          correctAnswer: true,
        },
        {
          label: 'It returns the longitute',
          correctAnswer: true,
        },
        {
          label: 'It returns the null',
          correctAnswer: true,
        },
        {
          label: 'This does not exit',
          correctAnswer: true,
        },
      ],
    },
    {
      questionTitle: 'What is len() in python ?',
      questionDescription:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      mcq: true,
      options: [
        {
          label: 'It returns the length',
          correctAnswer: true,
        },
        {
          label: 'It returns the longitute',
          correctAnswer: true,
        },
        {
          label: 'It returns the null',
          correctAnswer: true,
        },
        {
          label: 'This does not exit',
          correctAnswer: true,
        },
      ],
    },
  ]);
  console.log(props)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState(new Array(questions.length).fill(false));

  const currentQuestion = questions[currentQuestionIndex];

  const handleOnclick = (index) => {
    setCurrentQuestionIndex(index);
    const dupVisitedQuestions = [...visitedQuestions];
    dupVisitedQuestions[index] = true;
    setVisitedQuestions(dupVisitedQuestions);
  };

  useEffect(() => {
    const dupVisitedQuestions = [...visitedQuestions];
    dupVisitedQuestions[0] = true;
    setVisitedQuestions(dupVisitedQuestions);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(questions);
    console.log(event);
  };

  const handleAnswer = (answer) => {
    const dupQuestions = [...questions];
    dupQuestions[currentQuestionIndex] = { ...dupQuestions[currentQuestionIndex], answer };
    setQuestions(dupQuestions);
  };

  useEffect(() => {
    localStorage.setItem('errorCount', 0);

    document.addEventListener('visibilitychange', (event) => {
      if (document.visibilityState === 'visible') {
        console.log('tab is active');
        const errorCount = parseInt(localStorage.getItem('errorCount'), 10);

        localStorage.setItem('errorCount', errorCount + 1);
        console.log(localStorage.getItem('errorCount'));
      } else {
        console.log('tab is inactive');
      }
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <ShowQuestion question={currentQuestion} handleAnswer={handleAnswer} activeIndex={currentQuestionIndex} />
        <Button onClick={handleSubmit}>Submit Answer</Button>
      </Grid>
      <Grid item md={3}>
        <QuestionLedger
          btnCount={questions.length}
          onclick={handleOnclick}
          activeIndex={currentQuestionIndex}
          visitedQuestions={visitedQuestions}
        />
      </Grid>
    </Grid>
  );
}

export default ExamScreen;
