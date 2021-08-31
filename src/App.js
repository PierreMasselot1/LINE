import './App.css';

import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import React, { useRef, useState } from 'react';
firebase.initializeApp({
  apiKey: "AIzaSyBznLlU-GFHbU2CYKho4oGN3Y0tWzOEqVw",
  authDomain: "line-6610e.firebaseapp.com",
  projectId: "line-6610e",
  storageBucket: "line-6610e.appspot.com",
  messagingSenderId: "915334769602",
  appId: "1:915334769602:web:14d9c66fd72f727267845b",
  measurementId: "G-31KJ7XCBYC"
})

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
       
      </header>
      <section>
        {user? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){

  //pop up window
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  //sign in button
  return(
  <button onClick={signInWithGoogle}>Sign in with Google</button>)
}
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  
  const sendMessage = async(e) =>{
    e.preventDefault();
    const{uid, photoURL} = auth.currentUser;

    await messagesRef.add({
       text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
         uid, 
         photoURL })

    setFormValue('');
  }
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit">💬</button>

      </form>

    </>
  )


}

function SignOut(){
  return auth.currentUser && ( <button onClick={()=> auth.signOut()}>Sign Out</button>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : ' received';

  return (<div className={`message ${messageClass}`}>
    <img src={photoURL} />
    <p>{text}</p>
  </div>)
}

export default App;
