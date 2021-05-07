import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from './components/FirebaseConfig/FirebaseConfig';

firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    name: '',
    email: '',
    photoURL: '',
    isSignedIn: false
  })
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then((res)=>{
      const {displayName, photoURL, email} = res.user;
      const newUser = {
        name: displayName,
        email,
        photoURL,
        isSignedIn: true
      }
      .catch((err)=>{
        console.log(err.message);
      })
      setUser(newUser);
    })
  }
  const handleSignOut = () =>{
    const newUser = {
      name: '',
      email: '',
      photoURL: '',
      isSignedIn: false
    };
    setUser(newUser);
  }
  return (
    <div className="App">
      { user.isSignedIn ?
        <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
      {user.isSignedIn && 
      <div>
        <p>Welcome: {user.name}</p>
        <p>Your email: {user.email}</p>
        <img src={user.photoURL} alt=""></img>
      </div>
      }
    </div>
  );
}

export default App;
