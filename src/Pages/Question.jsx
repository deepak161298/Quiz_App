
import React from "react";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
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

import { handleScoreChnage,userAnswers } from "../Redux/action";
import { array } from "yup";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    user_answers,
    question_type,
    question_limit,
    amount_of_question,
    score,
    name,
    question_answers
  } = useSelector((state) => state);

  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;

  


  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [enableNext, setEnableNext] = useState(false)
  const [intialRender, setInitialRender] = useState(true)

  const handleListItemClick = (
    number
  ) => {
    setSelectedIndex(number);
  };
  useEffect(() => {
    
    if (question_answers?.length) {
      const question = question_answers[questionIndex];
    
      let answers = []
      for (const [key, value] of Object.entries(question.answers)) {
      

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
    }else{
      history.push("/")
    }
  }, [question_answers, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (dataName, next) => {
  
    const question = question_answers[questionIndex];
    if(next ){
  
      dispatch(userAnswers({
        questionId:question.id,
        selectedAnswer:dataName}))
    }
    if (next && questionIndex + 1 < question_answers.length) {
    
     
      if (dataName == question.correct_answer) {
        dispatch(handleScoreChnage(score + 1));
      }else{
     
        if(question.correct_answers[dataName+"_correct"] === "true"){
         
          dispatch(handleScoreChnage(score + 1));
        }
      }

  
      // dispatch(userAnswers({
      //   questionId:question.id,
      //   selectedAnswer:dataName}))
      setInitialRender(true)
      setQuestionIndex(questionIndex + 1);
      setSelectedIndex(0)
    } else {
     
      if (dataName == question.correct_answer) {

        dispatch(handleScoreChnage(score + 1));
      }else{
      
        if(question.correct_answers[dataName+"_correct"] === "true"){
        
          dispatch(handleScoreChnage(score + 1));
        }
      }
  
        
      let percentageValue = ((score / question_answers.length) * 100).toFixed(0);
      if(name){
        const userResult = {
          name: name,
          question_difficulty: question_difficulty,
          question_limit: question_limit,
          question_category,
          score: score,
          user_answers: user_answers,
          percentageValue: percentageValue,
          question_answers: question_answers
        }
    
        let getUserDetails = localStorage.getItem("userDetails")
    
        if (!getUserDetails) {
          var userArray = []
          localStorage.setItem("userDetails", JSON.stringify(userArray))
        } else {
         
          if (localStorage.getItem("userDetails")) {
            localStorage.setItem("userDetails", JSON.stringify([...JSON.parse(localStorage.getItem("userDetails")), userResult]))
          }
        }
       
      }
      console.log(localStorage.getItem("userDetails"),"getUser")

      window.location.href = `/score?scoreValue=${score}&pecentageValue=${percentageValue}&limit=${question_answers.length}`
      //  history.push("/score");
    }
  };

  return (
    <>
<Container maxWidth={"xl"} >
      <Box mt={2} mb={2} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Welcome {name}</Typography>
        <Typography variant="h4">{question_category}</Typography>
        <Typography variant="h6">Questions {questionIndex + 1 + "/" + question_answers.length}</Typography>
      </Box>
      </Container>
      <Container sx={{ display:"flex",alignItems:"center",justifyContent:"center",}}  >
      <Card  className="question-card"  sx={{ minHeight:"80vh",width:"74%"}}>
        <CardContent className="card-question" >
          <Typography variant="h3" className="qust" mt={5} >
            {/* {decode(response.results[questionIndex].question)} */}
            {question_answers[questionIndex].question}
          </Typography>
          {options.map((data, id) => (
            <Box mt={2} key={id}>
              <List component="nav" aria-label="main mailbox folders" className="ans-list">
                <ListItemButton sx={{boxShadow:"2"}} name={Object.keys(data)}
                  selected={!intialRender ? id === selectedIndex : false}
                  onClick={() => {
                    setInitialRender(false);
                    handleListItemClick(id);
                  }}
                >
                  <ListItemText primary={Object.values(data)} />
                </ListItemButton>
              </List>
              {/* <Button name={Object.keys(data)} onClick={handleClickAnswer} variant="contained">
            {Object.values(data)}
          </Button> */}
            </Box>
          ))}
          {/* <Box mt={5}>
            Score: {score} / {question_answers.length}
          </Box> */}
         
        </CardContent>

        <CardActions sx={{padding:"30px"}} >
            <Box display={"flex"} width={"100%"} justifyContent={"flex-end"}>
              {/* <Button variant="contained" size="medium">PREV</Button> */}
              <Button disabled={intialRender} onClick={(e) => { handleClickAnswer(...Object.keys(options[selectedIndex]), true) }} variant="contained" size="medium">
                {questionIndex + 1 === question_answers.length ? "SUBMIT" : "NEXT"}
              </Button>
            </Box>
          </CardActions>
      </Card>
      </Container>
    </>
  );
};

export default Questions;
