import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';


initializeAuthentication();


const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();



  const handleGoogle = () =>{
 
  signInWithPopup(auth, googleProvider)
  .then(result => {
  const {displayName, email} = result.user;
  const loggedInUser ={
    name : displayName,
    email : email
   
  };
  setUser(loggedInUser);
  
  })

  .catch(error =>{
    console.log(error.message);
  })

  }

  const handleGitHub = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result =>{
      const {displayName, email} = result.user
      const loggedInUser = {
        name : displayName,
        email : email
      }
      setUser(loggedInUser);
    })
  }

  const handleSingOut = () => {
    signOut(auth)
    .then( () =>{
      setUser({})
    })
  }

  return (
    <div className="App">
     { !user.name ?
        <div>
        <button onClick = {handleGoogle} >google sing in</button>
  
        <button onClick = {handleGitHub}>github sing in</button>
        </div> :
        <button onClick = {handleSingOut}>sing out</button>
     }

      
      <br/>
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email {user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;
