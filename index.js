const express = require('express');
const http = require('http');
const path = require('path');
const cors=require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection',(socket)=>{
  console.log("user is connected",socket.id);
  
  socket.on("client-msg",(msg)=>{
    console.log(msg);
    const msg1=socket.id+" : "+msg;
    io.emit("server-msg",msg1);
  })
})

server.listen(9000, () => {
  console.log(" Server running at http://localhost:9000");
});
