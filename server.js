const express= require('express')
const app=express();
const http=require('http').createServer(app)
const cors = require('cors');
app.use(cors());
const PORT=3000;
http.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server running on public IP:${PORT}`);
})

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("connected");

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})
