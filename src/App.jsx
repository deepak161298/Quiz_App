import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Setting from "./Pages/Setting";
import Final from "./Pages/Final";
import Question from "./Pages/Question";
import Error from "./Components/404/Error";
import Admin from "./Pages/Admin";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import ViewQuestion from "./Pages/viewQuestions";

function App() {

  useEffect(()=>{
    if(!localStorage.getItem("userDetails")){
    var userArray = []
    localStorage.setItem("userDetails", JSON.stringify(userArray))
    }
  },[])
  return (
    <div className="App">
      <Router>
       
          <Box textAlign="center" >
            <Switch>
              <Route exact path="/">
               
                <Container maxWidth="sm">
                <Setting />
                </Container>
              </Route>
              <Route path="/admin">
              <Typography variant="h2" fontWeight="bold">
                  QUIZ TAKERS
                </Typography>
                <Admin/>
              </Route>
              <Route path="/viewQuestion">
                <ViewQuestion />
              </Route>
              <Route path="/question">
                <Question />
              </Route>
              <Route path="/score">
                <Final />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </Box>
       
      </Router>
    </div>
  );
}

export default App;
