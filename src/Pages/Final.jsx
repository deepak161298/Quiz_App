import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LinearProgress } from '@mui/material';
import { handleLimitChange, handleScoreChnage, userAnswers } from "../Redux/action";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect } from "react";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const Final = () => {
  const disptach = useDispatch();
  const history = useHistory();

  const { question_difficulty, name, question_limit, question_answers, question_category, score, user_answers, } = useSelector((state) => state);
  // let percentageValue = ((score / question_answers.length) * 100).toFixed(0);
  useEffect(() => {
   


  if(urlParams.get("limit").length == 0){
    history.push("/")
  }
  }, [])

 


  return (
    <Box display={"lex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Container maxWidth={"sm"} sx={{ boxShadow: 5 }}>
      
        <Card sx={{ minWidth: "100%",minHeight:"50vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",borderRadius:"24px" }}>
          <CardContent>
            <Typography variant="h4" className="result" fontWeight="bold" mb={2}>
             QUIZ RESULT
            </Typography>
            <Typography variant="h5" className="result" fontWeight="bold" mb={1}>
              Final Score : {urlParams.get("scoreValue")}/{urlParams.get("limit")}
            </Typography>
            <Typography variant="h5" className="result" fontWeight="bold" mb={1}>
              Your Percentage : {urlParams.get("pecentageValue") + "%"}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={()=>history.push("/")} >
              back to settings!
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default Final;
