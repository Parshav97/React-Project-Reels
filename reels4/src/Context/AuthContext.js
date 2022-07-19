import React, {useState, useEffect} from 'react'
import {auth} from '../firebase' ;

export const AuthContext = React.createContext();

// children destructured from the props
export function AuthProvider({children}){
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        // it will run on componentWillUnmount time
        // event listener attached at componentDidMount
        //  will automatically be deleted at componentWillUnmount
        return ()=>{
            unsub();
        }
    },[])

    const store={
        user,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {/* it means idf loading is set to false then show all the childrens after they are being validated by context */}
            {!loading && children}
        </AuthContext.Provider>
    )
}