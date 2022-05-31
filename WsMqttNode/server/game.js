const { Socket } = require("socket.io");

module.exports = {
    createGame,
    joinGame,
    initGame,
}

function initGame() {
    state = createGame();
    return state;
}

function createGame(client,state) {
    return {
        bx: 1,
        by: 1,
        uy: 1,
        cy: 1,
        us: 0,
        cs: 0,
        vx: 0,
        vy: 0,
    }

};

function joinGame(player,room,client) {
    if (clientRooms[room][player.role] == '0') {
        clientRooms[room][2] = client.id;
        client.join(room);
        return true;
    } else {
        return false;
    }

}
