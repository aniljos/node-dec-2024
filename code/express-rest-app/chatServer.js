// configuring an http server with express & socket.io 
import chalk from 'chalk';
import {createServer} from 'node:http';
import express from 'express';
import {Server} from 'socket.io';

const expressApp = express();
const httpServer = createServer(expressApp);

const socketio = new Server(httpServer);

expressApp.use(express.static("public"));

//client sockets
const clientSockets = [];

//This event listens for a clinet connection
socketio.on("connection", (socket) => {

    let clientName;
    socket.on("register", (name) => {
        clientName = name;
        clientSockets.push(socket);
        console.log(chalk.yellowBright(`A new socket.io client ${name} connected to the server...`));
        socket.send(`Welcome ${name} to the socket-io server`);
    })

    socket.on("message", (message) => {
        
        const detailedMessage = `${clientName}: ${message}`;
        
        console.log(detailedMessage);

        clientSockets.forEach(socket => {
            socket.emit("broadcast", detailedMessage);
        })
    })

})


const PORT = 9040
httpServer.listen(PORT, () => {
    console.log(chalk.yellow.inverse("Http server with express and socket.io started at PORT: " + PORT));
})