import cron from "node-cron";
let cache = [];
const notification = (socket,io) => {

    socket.on('joinRoomAdmin' ,(data) => {
        if (data.password === "123") {
            socket.join(data.roomId);
            socket.emit('joinRoomAdmin', {message : "join room success", success : true})
        } else {
            socket.emit('joinRoomAdmin', {message : "password sai", success : false})
        }
    })

    
    socket.on('adminSendNotification', (data) => {
       
        cache.push(data);  
        io.emit("userNotification" , cache)
        jobResetNotification();
    })

    socket.on("disconnect", () => {
        // console.log("User disconnected");
    });
}

const jobResetNotification =() => {
    console.log(cache);
    if (cache.length > 0) {
        cron.schedule("0 0 * * *", async () => {
            //(4)
            const X_DAYS = 7; //Xét khoảng thời gian 7 ngày trước ngày hết hạn
            const expiryDate = new Date(2024, 1, 12); //Lấy ngày 12-2-2024 (1)
            expiryDate.setDate(expiryDate.getDate() - X_DAYS); //(2)
        
            
            try {
              cache.forEach((item) => {
                if (item.expiryDate < expiryDate) {
                  cache.splice(cache.indexOf(item), 1);
                }
              })
            
              
              console.log(`Đã xóa ${cache.length} thư hết hạn.`);
            } catch (error) {
              console.error("Lỗi khi xóa thư hết hạn:", error);
            }
          });
    } else {
        console.log( "Khong co thong bao duoc reset");
        
    }
   
}
export {notification , jobResetNotification}
