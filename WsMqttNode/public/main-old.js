const socket = new WebSocket(`ws://${window.location.host}`);

function check() {
    document.getElementById("check11").checked = true;
}

function uncheck() {
    document.getElementById("check11").checked = false;
}

socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    if (event.data == "change") {
        if (document.getElementById("check11").checked == true) {
            uncheck();
        }
        else {
            check();
        }
    }
    

});
