import { randomInt } from "crypto"
let cache ={
    roomId : [],
    
}
const ChatMessage = {
    SendManager : (socket, managerId, userId , message , io) => {
       console.log(socket);
       
        const roomCheck = cache.roomId.find((room) => room === `${managerId}-${userId}`)
        socket.emit('message', {message : message, roomId : roomCheck});
        // console.log(roomCheck);
       
        
        
        // if(roomCheck) {
        //     socket.emit('message', {message : message, roomId : roomCheck});
        // }
        // // const roomId = `${managerId}-${userId}`;
        // // // console.log(roomId);
        
        // // // socket.join(roomId);
        // // socket.emit('message', {message : message, roomId});
        // const roomId = `${managerId}-${randomInt(0,1000)}-${userId}`;
        // socket.join(roomId);
        // socket.emit('message', {message : message, roomId});
        // io.to(roomId).emit('message', {message : message, roomId});
    },
    createRoom : (socket, managerId, userId) => {
        const roomCheck = cache.roomId.find((room) => room === `${managerId}-${userId}`)
    
        if(!roomCheck || roomCheck === undefined  ) {
            socket.emit('createRoom', { roomId : roomCheck});
            const roomId = `${managerId}-${userId}`;
            cache.roomId.push(roomId);
            //     console.log(cache);
            // socket.join(roomId);
            if (roomId) {
                socket.emit('createRoom',{message : "create room success", roomId});
            }
          
        } else {
            console.log("not found room");
            
            socket.emit('createRoom', {message :  "not found room" , success : false});
        }
       
        // io.to(roomId).emit('createRoom', { roomId}); 
    }
}
export default ChatMessage 