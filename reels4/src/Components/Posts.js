import React from 'react'
import { useState, useEffect } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress'
import Video from './Video'
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import Like2 from './Like2'
import AddComments from './AddComments'
import Comments from './Comments'


function Posts({ userData }) {
    const [posts, setPosts] = useState(null)

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(async () => {
        let parr = []

        // console.log(await database.posts.orderBy('createdAt','desc').get())
        const unsub = database.posts.orderBy('createdtAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)

        })
        return unsub
    }, [])

    const callback = (entries) => {
        entries.forEach((entry) => {
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, { threshold: 0.6 });

    useEffect(() => {
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element) => {
            // it will continue to observe
            // attached as an event listener
            observer.observe(element)
        })

        return ()=>{
            observer.disconnect();
        }
    }, [posts])

    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => {
                                return <React.Fragment key={index}>
                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profileUrl} />
                                            <h4>{userData.fullname}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen(post.postId)} />
                                        <Dialog
                                            open={open == post.postId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                        <video autoplay={true} muted="muted" controls>
                                                            <source src={post.pUrl} />
                                                        </video>
                                                    
                                                    {/* <Video src={post.pUrl} className="modal-video" /> */}
                                                </div>
                                                <div className="comments-modal">
                                                    <Card className="card1" style={{padding:'1rem'}}>
                                                        <Comments postData={post} />
                                                    </Card>

                                                    <Card variant="outlined" className="card2">
                                                        <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{display:'flex'}}>
                                                            <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                            <AddComments postData={post} userData={userData}/>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                            {/* <DialogTitle id="alert-dialog-title">
                                                {"Use Google's location service?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Let Google help apps determine location. This means sending anonymous
                                                    location data to Google, even when no apps are running.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Disagree</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                    Agree
                                                </Button>
                                            </DialogActions> */}
                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            })

                        }
                    </div>
            }

        </div>
    )
}

export default Posts