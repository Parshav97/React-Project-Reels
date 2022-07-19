import * as React from 'react';
import { useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Alert, TextField } from '@mui/material';
import './Login.css'
// import { makeStyles } from "@mui/style"
import insta from '../Assets/insta.jpg';
import carbg from '../Assets/carbg.jpg';
import bg1 from '../Assets/bg1.jpg';
import bg2 from '../Assets/bg2.jpg';
import bg3 from '../Assets/bg3.jpg';
import { Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link, useHistory } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import Carousel from './Carousel'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const store = useContext(AuthContext)
    console.log(store)
    // const useStyles = makeStyles({
    //     text1:{
    //         color:'grey',
    //         textAlign:'center'
    //     }
    // })
    // const classes = useStyles();
    // const bg =''
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory('')
    const {login} = useContext(AuthContext)

    const handleClick= async()=>{
        try{
            setError('');
            setLoading(true)
            let res = await login(email,password)
            setLoading(false);
            history.push('/')
        }catch(err){
            setError(err)
            setTimeout(()=>{
                setError('')
            },2000)
            setLoading(false);
        }
    }
    return (

        <div className="loginWrapper">
            <div className="imgcar" style={{ backgroundImage: 'url(' + carbg + ')', backgroundSize: 'cover' }}>
                <div className="car">
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={3}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={bg1}/></Slide>
                            <Slide index={1}><Image src={bg2}/></Slide>
                            <Slide index={2}><Image src={bg3}/></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div className="loginCard">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <img src={insta} alt="logo" />
                    </div>
                    <CardContent>

                        {error!='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <Typography color="primary">
                            Forgot Password ?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" sx={{ marginTop: '2%', height: '3vh' }}>
                    <Typography color="text.secondary" align='center' >
                        Don't have an account ?  <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
                    </Typography>
                </Card>
            </div>
        </div>

    );
}
