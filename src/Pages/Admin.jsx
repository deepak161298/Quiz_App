import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardActionArea, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Admin() {
    const history = useHistory();
const dispatch = useDispatch()
   const viewAnswers = async (data)=>{
    history.push({
        pathname:"/viewQuestion",
        state:{
            userData:data
        }
    })
   
   }


    const [userdatas, setUserDatas] = React.useState([])
    React.useEffect(() => {
        let userDetails = localStorage.getItem("userDetails")
        let data = [...new Set(JSON.parse(userDetails))]
        setUserDatas(data)
    }, [])
    return (
        <Container maxWidth={"lg"}>
        <Box mt={5} spacing={2}>
            <Grid container spacing={{ xs: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {userdatas.length > 0 ? userdatas?.map((data, index) => (

                    <Grid item xs={0} sm={4} md={4} key={index}>
                        <Item>
                            <Card >
                                <CardActionArea onClick={() => {
                                    viewAnswers(data)
                                }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" >
                                            {data.name}
                                        </Typography>
                                        <Typography textAlign={"left"} variant="body2" >
                                            Category : {data.question_category}
                                        </Typography>
                                        <Typography textAlign={"left"} variant="body2" >
                                            Difficulty : {data.question_difficulty}
                                        </Typography>
                                        <Typography textAlign={"left"} variant="body2" >
                                            Score : {data.score}
                                        </Typography>
                                        <Typography textAlign={"left"} variant="body2" >
                                            Percentage : {data.percentageValue}
                                        </Typography>
                                        <Typography sx={{ color: "#000" }} textAlign={"left"} variant="body2" color={"#000"}>
                                            Click to view answers
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Item>
                    </Grid>
                )) :
                    <Typography textAlign={"center"} variant="h5" color="text.secondary">
                        NO USER FOUND
                    </Typography>
                }
            </Grid>
        </Box>
        </Container>
    );
}