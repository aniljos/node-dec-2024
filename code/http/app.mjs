import {createServer} from 'node:http';

// create an http server
const server = createServer((req, resp) => {

    //resp.setHeaders("content-type", "text/plain");
    
    resp.writeHead(200, "OK");
    resp.write("Hello World");
    resp.end();


});


const PORT = 9000;
server.listen(PORT, () => {
    console.log("Http server started at PORT: " + PORT);
})