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
  socket.on('User ID', (id)=>{
    console.log(`user ${id} online`)
    socket.join(id)
  })
  
  socket.on('message', (data) =>{
    console.log(data)
    socket.to([data.sender, data.receiver]).emit('message', data)
    // socket.broadcast.emit('message', data => {
    //   console.log(data)
    // })
    // socket.to(data.receiver).emit('message', data)
    // socket.join('test')
    // socket.to('test').emit('message', (data))

  })


  socket.on('disconnect', ()=> {
    console.log('user left');
  })

  

})


// middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// middleware-logging
app.use(morgan('dev'))


// routes
app.use('/app', routeAll)




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