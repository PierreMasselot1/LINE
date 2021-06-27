import './App.css';

import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD-L_StMyyzMij4CZIB5OwKrehWFPPEsKM",
    authDomain: "line-583cd.firebaseapp.com",
    databaseURL: "https://line-583cd-default-rtdb.firebaseio.com",
    projectId: "line-583cd",
    storageBucket: "line-583cd.appspot.com",
    messagingSenderId: "320464290156",
    appId: "1:320464290156:web:c89b4ba01fa94581b3f349",
    measurementId: "G-K8LHZD43X5"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
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

  //sign in buttong
  <button onClick={signInWithGoogle}>Sign in with Google</button>
}
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectioData(query, {idField:'id'});
  return(
    <>
    <div>
      {messages&&messages.map (msg => <ChatMessage key = {msg.id} message={msg} />)}
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
