const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const userRoute = require('./routes/userRoute');
const rateLimit = require('express-rate-limit');
const loginRoute = require('./routes/loginRoute');
const MessageModel = require('./model/MessageModel');
const authMiddleware = require('./middleware/jwtauthmiddleware');
const app = express();
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
app.use(cookieParser()); // 🔥 REQUIRED
//app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
const ipLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 mins
    max: 100, // each IP => 1 requests
    message: 'Too many requests from this IP',
    handler: (req, res, next, options) => {
        console.log('Rate limit:',req.rateLimit,req.ip);
        res.status(options.statusCode).json({
            message: options.message
        });
    },
});
app.use(ipLimiter);
app.use(express.json());
connectDb();
// ✅ mount BEFORE listen (best practice)
app.use('/api/user', authMiddleware, userRoute);
app.use('/api',loginRoute);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
    });  
    socket.on('send_message', async (data) => {
        try{
            io.to(data.roomId).emit('receive_message', data);
           // console.log('Room Id',data.roomId);
            const messageObject = new MessageModel({
                roomId: data.roomId,
                senderId: data.senderId,
                senderName: data.senderName,
                message: data.message
            });
            const savemessage = await messageObject.save();
        }catch(err){
            console.log(err);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('OK');
});
server.listen(5000, () => {
  console.log('Server running on port 5000');
});