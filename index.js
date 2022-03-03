require('dotenv').config()
const express = require('express')
const helperCommon = require('./src/helper/common')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const routeAll = require('./src/route/index')
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"]
  }
 });


const PORT = process.env.PORT || 1234

// socket
io.on('connection', (socket) => {
  socket.on('userOnline', (data)=>{
    console.log(`user ${data.user_id} online`)
    socket.join(data.user_id)
  })

  socket.on('disconnect', ()=> {
    console.log('user left');
  })

  
  socket.on('sendMoney',(data)=>{
    socket.to(data.receiver).emit('sendMoney', data)
  })

})


// middleware
app.use(express.json())
app.use(cors())

// middleware-logging
app.use(morgan('dev'))


// routes
app.use('/', routeAll)




app.use('/file', express.static('./uploads'))


// url not found
app.use(helperCommon.url)

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err)
  helperCommon.respons(res, null, err.status, err.message)
})

// listen
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

module.exports = app