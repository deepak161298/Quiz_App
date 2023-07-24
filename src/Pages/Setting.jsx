import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SelectField from "../Components/SelectField";
import TextFieldCom from "../Components/TextField";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useFetchData, { getQuestions } from "../hooks/Axios";
import { handleCategoryChange, handleDifficultyChange, handleLimitChange, handleNameChange, handleScoreChnage, questionAnswers } from "../Redux/action";

const categoryOptions = [
  { id: "Random", name: "Random" },
  { id: "Linux", name: "Linux" },
  { id: "DevOps", name: "DevOps" },
  { id: "Networking", name: "Networking" },
  { id: "Cloud", name: "Cloud" },
  { id: "Docker", name: "Docker" },
]

const difficultyOption = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

const typeOptions = [
  { id: "5", name: "5" },
  { id: "10", name: "10" },
  { id: "15", name: "15" },
  { id: "20", name: "20" },
];

const errObject = {
  401: "Unauthenticated",
  404: "No questions found",
  429: "Too Many Requests"
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Setting = () => {
  const { response, loading, error } = useFetchData({ url: "/api_category.php" });
  const history = useHistory();
  const { question_category, question_difficulty, question_limit, name } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const[result,setResult] = useState()
  useEffect(() => {
    clearState()
  }, [])

  const dispatch = useDispatch()
  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  function clearState() {
    dispatch(handleScoreChnage(0));
    dispatch(handleCategoryChange(""));
    dispatch(handleDifficultyChange(""))
    dispatch(handleLimitChange(""))
    dispatch(handleNameChange(""))
  }



  if (error) {
    return (

      <Typography variant="h6" mt={20} color="red">
        Something went wrong!!
      </Typography>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("name : ", name);
    const url = `https://quizapi.io/api/v1/questions?${question_category ? "category=" + question_category : ""}${question_difficulty ? "&difficulty=" + question_difficulty : ""}${question_limit ? "&limit=" + question_limit : ""}`
    console.log("event : ", url);

    const result = await getQuestions(url)
    if (!errObject[result]) {
      dispatch(questionAnswers(result))
      history.push("/question");
    }else{
      setResult(errObject[result])
      setOpen(true)
    }
    console.log("result", result)
    // history.push("/question");
  };


  return (
<Grid sx={{display:"flex",alignItems:"center",justifyContent:"center",maxWidth:"100%",flexDirection:"column",minHeight:"100vh"}}>
<Typography variant="h2" fontWeight="bold">
                  Quiz App
                </Typography>
                <Box className="form-card">
    <form onSubmit={handleSubmit} className="form-box">
      <TextFieldCom  className="input-name" >Name</TextFieldCom>
      <SelectField className="input-name" options={categoryOptions} label="Category" />
      <SelectField className="input-name" options={difficultyOption} label="Difficulty" />
      <SelectField className="input-name" options={typeOptions} label="Limit" />
      <Snackbar className="input-name"   open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
      <Alert severity="error">{result}</Alert>
      </Snackbar>
     
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
    </Box>
    </Grid>

  );
};

export default Setting;
