import path from 'path';
import express from 'express'
import routes from './router/index.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

import { Server } from 'socket.io'
import { chatDAO } from './DAO/chatDAO.js';
import { dirname } from 'path';
import { mongodbURL } from './database/config.js';
import { fileURLToPath } from 'url';
import { normalizedMessages } from './utils/normalize.js';


const app = express()
const expressServer = app.listen(8080, () => {
  console.log('Server escuchando en el puerto 8080')
})

const io = new Server(expressServer)

//Session configuration
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
};
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongodbURL.connectionString,
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, //ACA LO QUE HACEMOS ES DECIRLE QUE NOS RENUEVE EL TIEMPO DE EXPIRACION DE LA SESION CON CADA REQUEST
    cookie: {
      maxAge: 120000,
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//EJS
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname,'./views')));

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')


//SERVER.IO
io.on('connection', async socket =>  {
    console.log(`Se conecto el cliente con id: ${socket.id}`)

    //obtengo los mensajes
    const messagesFromDB = await chatDAO.getAll()
    const normalizedChat = normalizedMessages(messagesFromDB)

    //Envio mensajes normalizados al front
    socket.emit('server:renderMessages', normalizedChat)
    
    //Evento de nuevo mensaje
    socket.on('client:newMessage', async (messageInfo) => {
        await chatDAO.postMessage(messageInfo)

        //por cada mensaje que se envía, actualizo a todos los clientes
        const messagesFromDB = await chatDAO.getAll()
        const normalizedChat = normalizedMessages(messagesFromDB)
        io.emit('server:renderMessages', normalizedChat)
    })
})

//Routes
app.use('/api', routes)
