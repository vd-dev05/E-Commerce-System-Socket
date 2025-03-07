// import { cacheTime } from "../../be/config/index.js";
import dotenv from 'dotenv'
dotenv.config()
let timeLeft = 180; 


let cache = {
  timeStart  : 1 ,
  timeEnd : 12,
  timeLeft: timeLeft,
  interval: null,
};
// export {
//   cache
// }

const startCountdown = (socket) => {
    // Send the initial countdown time when a new connection is made
    if (dataSale === null) {
      fetechData()
    }
   

    socket.emit('countdown', cache.timeLeft );

    if (cache.interval) { clearInterval(cache.interval); }
    if (cache.timeStart) { clearInterval(cache.timeStart); }
  
    cache.interval = setInterval(() => {
      // fetechData()
      cache.timeLeft -= 1;
      // cache.timeStart += 1;
      if (cache.timeLeft <= 0 ) {
        fetechData()
        cache.timeLeft = timeLeft;
        if (cache.timeStart === cache.timeEnd) {
          cache.timeStart = 1;
        }
        cache.timeStart += 1;
      } 
  
  
      socket.emit('countdown', {
        timeLeft: cache.timeLeft,
        timeStart: cache.timeStart,
        dataSale : dataSale
      });
    } , 1000);
  
  };
  let dataSale = null ;
  const fetechData = async () => {
    try {
      // console.log("Da goi ham");
      
      const response = await fetch(`${process.env.BACK_END_URL}/api/v1/users/products/sale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PASSWORD_CREATE_SALE}`
        },
      })
      const data = await response.json()
     
      dataSale  = data.products
    } catch (error) {
      console.log(error);
      
    }
  }

  export default startCountdown;