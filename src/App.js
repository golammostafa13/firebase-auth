import './App.css';
import firebaseConfig from './components/FirebaseConfig/FirebaseConfig';
import "firebase/auth";
import firebase from "firebase/app";
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);
const  provider = new firebase.auth.GoogleAuthProvider();
function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  const userSignedIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
       const user = {
         isSignedIn: true,
         name: displayName,
         email: email,
         photo: photoURL,
       };
       setUser(user);
      })
    .catch(err => {
      console.log(err.message);
    })
  };
  const userSignedOut = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const user = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(user);
    })
  };
  return (
    <div className="App">
    {user.isSignedIn ? 
      <button onClick = {userSignedOut}>Sign Out</button> 
      : <button onClick = {userSignedIn}>Sign In</button>
    }
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <img src={user.photo} alt=""/>
    </div>
    </div>
  );
}

export default App;
