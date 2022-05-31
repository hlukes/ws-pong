
var socket = io();
const canvas = document.getElementById('gamec');
const context = canvas.getContext('2d');
const roomspan = document.getElementById('roomcode');


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

const gI = {
    bx: fI.width/2,
    by: fI.height/2,
    ux: 2,
    uy: fI.height/2 - (fI.paddleH/2),
    cx: fI.width-(fI.paddleW+2),
    cy: fI.height/2 - (fI.paddleH/2),

}

socket.on('hello', function(data){  
    if (socket.id == data.sid) {
        gI.bx = data.bx;
        gI.by = data.by;
        gI.uy = data.uy;
        gI.cy = data.cy;
        paint(fI,gI)
    }

});

socket.on('roomAssigned', (rid) => {
    roomspan.textContent = rid;
});

function paint(fI,gI) {
    paintField(fI);
    paintBall(fI,gI);
    paintPaddle(gI,fI);

};

function paintBall(fI,gI) {
    context.beginPath();
    context.arc(gI.bx, gI.by, fI.ballSize, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
};
function paintPaddle (gI,fI) {
    context.fillStyle = "white";
    context.fillRect(gI.ux,gI.uy,fI.paddleW,fI.paddleH);
    context.fillStyle = "white";
    context.fillRect(gI.cx,gI.cy,fI.paddleW,fI.paddleH);
};

function paintField(fI) {
    context.fillStyle = fI.bgColor;
    context.fillRect(0,0,fI.width,fI.height)
    context.fillStyle = "white";
    for (let i = 0; i < fI.height; i = i+15) {
        context.fillStyle = "white";
        context.fillRect(fI.width/2-fI.netWidth/2, 5+(i/15)*(fI.netSpacer+fI.netHeight) ,fI.netWidth,fI.netHeight);
    }
    
};

function handleCreateRoom() {
    socket.emit('createRequest');
    console.log("createbutton clicked");
}

function handleJoinRoom () {
    console.log("join room clicked");
    const inputRoom = document.getElementById('RoomInputTxt').value;
    socket.emit('joinRequest', inputRoom);
    console.log('sent')
}



