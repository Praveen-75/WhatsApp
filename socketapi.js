const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var username = []
var userId = []

io.on('connection', (socket)=>{
    console.log('New user connected');
    socket.on("msg",function(data){

        // socket.join('/');
        // socket.to('/').broadcast.emit("msg" , data);

        // io.emit("msg", {data:data})
        io.emit("msg", {data:data});
    })

    socket.on("typing",function(){
        socket.broadcast.emit("typing",{username: username[userId.indexOf(socket.id)]})
    })


    socket.on("disconnect",function(){
        let ans =  userId.indexOf(socket.id)
        username.splice(ans,1)
        userId.splice(ans,1)
        console.log(username)
        console.log(userId)
    })
});


module.exports = socketapi;