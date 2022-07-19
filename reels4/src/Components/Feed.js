import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile'
import {database} from '../firebase'
import Posts from './Posts'
import Navbar from './Navbar'

function Feed() {
    const {user, logout} = useContext(AuthContext)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
      // snapshot willl get snapshot of database
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
        // console.log(snapshot.data())
      })
      // cleanup , event listener added will get removed
      return ()=>{unsub()}
    },[user])
    // whenever new user is looged in the event listener will be removed from rev user and and will be aplied to the new user
  return (
    <>
      <Navbar userData={userData} />
      <div style={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
          {/* <div className="comp" style={{width:'50%'}}>
          <h1>Welcome To Feed</h1>
          <button onClick={logout}>Logout</button>
          </div> */}
          <UploadFile user={userData} />
          <Posts userData={userData} />
      </div>
    </>
  )
}

export default Feed