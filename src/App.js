import './App.css';

import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'

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

  const [messages] = useCollectionData(query, {idField:'id'});
  return(
    <>
    <div>
      {messages&&messages.map(msg => <ChatMessage key = {msg.id} message={msg} />)}
    </div>
    <div>
      sa mere la pute
    </div>
    </>
  )

}

function SignOut(){
  return auth.currentUser && ( <button onClick={()=> auth.signOut()}>Sign Out</button>)
}

function ChatMessage(props){
  const {text, uid} = props.message;

  return <p> {text}</p>
}

export default App;
