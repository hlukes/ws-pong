const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createGame,joinGame,initGame } = require('./server/game');

const app = express();
const httpServer = createServer(app);
app.use(express.static('public'));
const io = new Server(httpServer, {transports: ['websocket','polling']});

const fI = {
    width: 600,
    height: 300,
    bgColor: "#212121",
    paddleW: 10,
    paddleH: 30,
    ballSize: 2,
    netWidth: 3,
    netHeight: 15,
    netSpacer: 10,
}
const data = {
    bx: 1,
    by: 1,
    uy: 1,
    cy: 1,
    sid: "x",
};

const state = {};
const clientRooms = {};
const indRooms = {};

function init (fI) {
    data.uy= fI.height/2 - fI.paddleH/2;
    data.cy= fI.height/2 - fI.paddleH/2;
    data.bx = fI.width/2;
    data.by= fI.height/2;
};

init(fI);




io.on("connection", (client) => {
    console.log(io.engine.clientsCount);
    idd = client.id;
    data.sid = idd;
    function updateGame(idd) {
        if (data.bx < fI.width) {
            data.bx = data.bx + 4;
        }
        else {
            data.bx = 0;
        }
        io.to(idd).emit('hello',data)
    };
    client.on('joinRequest', function (data) {
        console.log(data);

    });
    
    client.on ('createRequest', function (data) {
        if (indRooms[client.id]) {
            delete clientRooms[indRooms[client.id]]
        };
        const rid = Math.floor(1000 + Math.random() * 9000);
        while (clientRooms[rid] == true) {
            rid = Math.floor(1000 + Math.random() * 9000);
        };
        clientRooms[rid] = {
            1: client.id,
            2: null,
        };
        indRooms[client.id] = rid;
        client.emit('roomAssigned',rid);
        console.log(rid);
        console.log(clientRooms);
        console.log(indRooms);


    });
    
    state['xd'] = initGame();
    
    
    console.log(state);
    console.log(`${idd} connected`);
    console.log(Object.keys(state).length);
    console.log(Object.keys(state["xd"]).length);
    client.on("disconnect", (client) => {
        console.log(`${idd} disconnected`);
        console.log(io.engine.clientsCount);
    });
    const gameInterval = setInterval( function() { updateGame(idd); }, 1000/20 );
});


app.get('/', function(req, res){
    res.sendFile('index.html');
});

httpServer.listen(3000);