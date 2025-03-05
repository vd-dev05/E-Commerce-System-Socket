import crypto from 'crypto'
const handleSendMessage =  (socket, data,io) => {

    
    const message = {
        ...data,

        _id: generateId(),
    };

    let room = cacheChat.room.find(r => r.chat_room_id === data.chat_room_id);
    if (!room) {
        room = {
            chat_room_id: data.chat_room_id,
            data: [],
            count: 0
        };
        cacheChat.room.push(room);
    }

    room.data.push(message);
    room.count++;
    io.to(data.chat_room_id).emit("receive_message", room );

    if (room.data.length === 6) {
        const messageSave = [...room.data];
        io.to(data.chat_room_id).emit("sendDb", messageSave);
        room.data = [];
        room.count = 0;
    }

       //     // cach push phan tu cu trong mang
    //     // console.log("Đã có phòng chat, cập nhật tin nhắn");
    //     // let room = cacheChat.room.find(r => r.chat_room_id === data.chat_room_id);
    //     // // console.log(room);
    //     // if (room) {
    //     //     console.time("cache data");
            
    //     //     room.data.push(message);
    //     //     let userAndManagerMessages = room.data.filter(msg => 
    //     //         msg.sender_type === 'user' || msg.sender_type === 'manager'
    //     //     );
    //     //     while (userAndManagerMessages.length > 5) {
    //     //         const test = room.data.shift(); // xoa tin nhan cu
    //     //         console.log("data shift");
                
    //     //         console.log(test);
                
                
    //     //         userAndManagerMessages = room.data.filter(msg => 
    //     //             msg.sender_type === 'user' || msg.sender_type === 'manager'
    //     //         );
    //     //     }
    
          
    //     //     room.count = userAndManagerMessages.length;
    //     //     console.timeEnd("cache data")
            
    //     // }

   
};

const handleJoinRoom = (socket, roomId,io) => {
    socket.join(roomId);
};

const message = (socket, io) => {
    socket.on("joinRoom", (roomId) => {
        handleJoinRoom(socket, roomId,io);
    });
    socket.on("sendMessage", (data) => {
        
     handleSendMessage(socket, data,io);
    });
    socket.on("disconnect", () => {
        // console.log("User disconnected");
    });
    // socket.on("test", (data) => console.log(data)
    // )
    // socket.on("clearCache" , (data)=> {
    //     console.log(data);
    //     cacheChat.room = cacheChat.room.filter(item => item.chat_room_id !== data.roomId )
    //     console.log(cacheChat);
    // })
   

 
};

export default message
const generateId = () => {
    return crypto.randomBytes(12).toString('hex');
};
let cacheChat = {
    room: [
        {
            chat_room_id: "67bac4fd573a9f91cf68184b",
            data: [
                // {
                //     _id : "842ac92dfcff351c18fc0de9",
                //     chat_room_id : "67bac4fd573a9f91cf68184b",
                //     sender_id: '678523b9243b3eb1de5765f1',
                //     sender_type: 'user',
                //     message: 'toi tu van san pham nay ',
                //     timestamp: 1740313585229
                // }
            ],
            count: 1
        }
        // {
        //     chat_room_id: "67b9d7cc7c812d02c138e0bf",
        //     data: {
        //         user: null,
        //         manager: null
        //     },
        //     countUser: 0,
        //     countManager: 0
        // },
        // {
        //     chat_room_id: null,
        //     data: {
        //         user: null,
        //         manager: null,
        //     },
        //     countUser: 0,
        //     countManager: 0
        // }
    ]
}

let fakeDbMessage = {

}