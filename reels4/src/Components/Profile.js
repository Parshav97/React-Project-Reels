import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import { CircularProgress } from '@mui/material'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import "./Profile.css"

// import CircularProgress from '@mui/material/CircularProgress'
// import Video from './Video'
import './Posts.css'
// import Avatar from '@mui/material/Avatar';
// import Like from './Like'
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea, CardActions } from '@mui/material';

import Like2 from './Like2'
import AddComments from './AddComments'
import Comments from './Comments'

// in Profile instead of using props we made use of useParams
// we made use of onSnapshot because it is possible that same user is signed in from two devices and if the user make some changes over here then those changes need to be visible in second device
//  so if we use props only then these changes won't be visible
// so what we do here is we have fetch the id and will do onSnapshot and will get the data from database

function Profile() {
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useState(null)

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
            // console.log(snap.data())
        })
    }, [id])

    useEffect(() => {
        async function fetchData(){
            if (userData != null) {
                let parr = []
                for (let i = 0; i < userData.postIds.length; i++) {
                    let postData = await database.posts.doc(userData.postIds[i]).get()
                    // parr.push({...postData.data(),postId:postData.id})
                    // console.log(postData.data())
                    parr.push({...postData.data(), postId:postData.id})
                }
                setPosts(parr)
            }
        }
        fetchData();
    },[userData]);

    return (
        <>
            {
                posts == null || userData == null ?
                    <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className="upper-part">
                                <div className="profile-img">
                                    {/* <img src={userData.profileUrl} alt=""/> */}
                                </div>
                                <div className="info">
                                    <Typography variant="h5">
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography variant="h6">
                                        Posts: {userData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                            <div className="profile-videos">
                                {
                                    posts.map((post, index) => {
                                        return <React.Fragment key={index}>
                                            <div className="videos">
                                                <video muted="muted" onClick={() => handleClickOpen(post.id)}  >
                                                    <source src={post.pUrl} />
                                                </video>
                                                <Dialog
                                                    open={open === post.id}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    fullWidth={true}
                                                    maxWidth='md'
                                                >
                                                    <div className="modal-container">
                                                        <div className="video-modal">
                                                            <video autoPlay={true} muted="muted" controls>
                                                                <source src={post.pUrl} />
                                                            </video>

                                                            {/* <Video src={post.pUrl} className="modal-video" /> */}
                                                        </div>
                                                        <div className="comments-modal">
                                                            <Card className="card1" style={{ padding: '1rem' }}>
                                                                <Comments postData={post} />
                                                            </Card>

                                                            <Card variant="outlined" className="card2">
                                                                <Typography style={{ padding: '0.4rem' }}>{post.likes.length === 0 ? 'Liked by nobody' : `Liked by ${post.likes.length} users`}</Typography>
                                                                <div style={{ display: 'flex' }}>
                                                                    <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                    <AddComments postData={post} userData={userData} />
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </React.Fragment>
                                    })

                                }
                            </div>
                        </div>

                    </>
            }
        </>
    )
}

export default Profile