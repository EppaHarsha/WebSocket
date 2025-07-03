import { useState } from 'react'
import io from 'socket.io-client';
import './App.css'
import { useEffect } from 'react';
const socket=io('http://localhost:9000');
function App() {
  const[message,setMessage]=useState('');
  const[chat,setChat]=useState([]);
  const[cnt,setCnt]=useState(0);

    useEffect(()=>{
      socket.on("server-msg",(msg)=>{
          setChat(prev=>[...prev,msg]);
        });
        console.log("Hello")
        return () => {
          console.log('endd');
          socket.off("server-msg");
        };
      }
      
      ,[cnt]);
    function btn(){
      setCnt(cnt+1);
    }

  const msgSent=()=>{
    socket.emit("client-msg",message);
    setMessage('');
  }
  function check(){
    chat.map((msg,i)=>(
        console.log(msg)
      ));
  }

  return (
    <>
      <h1>Chat App</h1>
      {chat.map((msg,i)=>(
        <p key={i}>{msg}</p>
      ))}
      <input type="enter message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={msgSent}>Sent</button>
      <button onClick={check}>check</button>
      <p >{cnt}</p>
      <button onClick={btn}>click</button>
    </>
  )
}

export default App
