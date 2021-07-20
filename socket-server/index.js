/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const io = require('socket.io')(4000, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

const { getUsers,addUser, removeUser, getUser, getUsersInRoom } = require('./users');


io.on('connect', (socket) => {

    //on new connection
    socket.on('join', (obj) => {
        if (obj !== undefined) {
            const name = obj.name;
            const room = obj.room;
            

            const { error, user } = addUser({ id: socket.id, name, room });
            
            // if(error) return ;

          socket.join(user.room);
          

          socket.emit('message', { text: 'Welcome..!! You are in the auction' });
            socket.broadcast.to(user.room).emit('new-user-joined', { text: `${user.name} has joined the auction!` });

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        }
    });
    

    //on new bid

    socket.on('new-bid', (bidValue) => {
        const user = getUser(socket.id);

        socket.emit('your-bid', { newBid: bidValue });
        socket.broadcast.to(user.room).emit('update-bid', { user: user.name, newBid: bidValue });
        

    });
    

    //on disconnection
  
  
  // socket.on("disconnect", () => {
  //   console.log("USER DISCONNECTED");
  // });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    //console.log("disconnected");
        if(user) {
      socket.broadcast.to(user.room).emit('left', {text: `${user.name} has left the Auction.` });
      //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
           // callback();
    }
  })


});


