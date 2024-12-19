// configuring an http server with express & socket.io 
import chalk from 'chalk';
import {createServer} from 'node:http';
import express from 'express';
import {Server} from 'socket.io';

const expressApp = express();
const httpServer = createServer(expressApp);

const socketio = new Server(httpServer);

//This event listens for a clinet connection
socketio.on("connection", (socket) => {

    console.log(chalk.yellowBright("A new socket.io client connected to the server..."));

})


const PORT = 9040
httpServer.listen(PORT, () => {
    console.log(chalk.yellow.inverse("Http server with express and socket.io started at PORT: " + PORT));
})