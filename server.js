const http  = require("http");
require("dotenv").config();
require('./config/dbconnect');

 const PORT = process.env.PORT || 3000;
 const app = require("./app/app");
const { mongoConnect } = require("./config/dbconnect");
  
 
 const server = http.createServer(app);

async function startServer(){
   await mongoConnect();
   
   server.listen(PORT,()=>{
      console.log(`Listening on port ${PORT}...`)
   })
}
startServer();