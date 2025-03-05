import { createServer } from "http";
import { Server } from "socket.io";
import startCountdown from "./src/countDown.js";
// import ChatMessage from "./src/chatmessage.js";
import message from "./src/sendManager.js";
import {notification, jobResetNotification} from './src/notification.js'
import dotenv from "dotenv";    
dotenv.config();
const httpServer = createServer();
const PORT = process.env.PORT || 5001;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {   
    // console.log("A user connected:", socket.id);
    // dot sale countdown
    
    startCountdown(socket);

    // chat message
    message(socket,io)
    notification(socket,io)
    jobResetNotification()
});

httpServer.listen(PORT, '0.0.0.0',() => {
    console.log(`Socket.IO server running on port: 5001`);
});

