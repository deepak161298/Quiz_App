
import React from "react";
import { Button, CircularProgress, Typography, useRadioGroup } from "@mui/material";
import { Box } from "@mui/system";

import { decode } from "html-entities";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useAxios from "../hooks/Axios";
import {Container} from "@mui/material";
import { handleScoreChnage,userAnswers } from "../Redux/action";
import { array } from "yup";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const answerResponse = {
    "answer_a":"Option A",
    "answer_b":"Option B",
    "answer_c":"Option C",
    "answer_d":"Option D",
    "answer_e":"Option E",
    "answer_f":"Option F",
}

const ViewQuestion = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
    name,
    question_answers
  } = useSelector((state) => state);

  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;


  const { response, loading } = useAxios({ url: apiUrl });
  const[userData,setUserData] = useState({})
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [enableNext, setEnableNext] = useState(false)
  const [intialRender, setInitialRender] = useState(false)

  useEffect(() => {
    setUserData(history.location.state.userData)
    console.log("looo",userData);
  }, [])

  const handleListItemClick = (
    number
  ) => {
    setSelectedIndex(number);
  };
  useEffect(() => {
    if (userData.question_answers?.length) {
      const question = userData.question_answers[questionIndex];
      console.log("question ", userData.question)
      let answers = []
      for (const [key, value] of Object.entries(question.answers)) {
        console.log("values", value);

        if (value)
          answers.push({
            [key]: value
          })
      }
      answers.splice(
        getRandomInt(question.answers.length),
        0,
        // question.correct_answer
      );
      setOptions(answers);
    }
  }, [userData.question_answers, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (name, next) => {
    const question = question_answers[questionIndex];
    if (next && questionIndex + 1 < question_answers.length) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <><Container maxWidth={"xl"} >
    <Box mt={2} mb={2} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" className="">Welcome {userData.name}</Typography>
        <Typography variant="h4">{userData.question_category}</Typography>
        <Typography variant="h4">Questions {questionIndex + 1 + "/" + userData.question_answers.length}</Typography>
      </Box>
      </Container>
      <Container  maxWidth={"md"}>
      <Card  className="question-card"  sx={{minHeight:"80vh"}}>
        <CardContent className="card-question">
          <Typography mt={5} className="qust">
          </Typography>
          {options.map((data, id) => (
           
            <Box mt={2} key={id}>
              { console.log("++++++",data,id)}
              <List  component="nav" aria-label="main mailbox folders">
                <ListItemButton sx={{boxShadow:"2"}}name={Object.keys(data)}
                  selected={ userData.user_answers.find((e)=>e.questionId == userData.question_answers[questionIndex].id)?.selectedAnswer == Object.keys(data)[0] }
                >
                  <ListItemText primary={Object.values(data)} />
                </ListItemButton>
              </List>
            
            </Box>
          ))}
      
         
        </CardContent>
        <Typography variant="h3">Score {userData.score}/{userData.question_answers.length}</Typography>
        <CardActions sx={{padding:"30px"}} >
      
            <Box display={"flex"} width={"100%"} justifyContent={"flex-end"}>
             {userData.question_answers.length == questionIndex+1 ?   <Button variant="contained" onClick={() => {history.push("/admin")}}>Back to Dashboard</Button> :
              <Button variant="contained" onClick={() => {setQuestionIndex(questionIndex+1)}}>NEXT</Button>
             }
            </Box>
           
          </CardActions>
      </Card>
      </Container>
    </>
  );
};

export default ViewQuestion;
