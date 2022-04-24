
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

var socket = io(); 



$("form").submit(function(e) {
    var socket = io(); 
    e.preventDefault(); // prevents page reloading
    const msg = $("#message").val()
    if(msg){
        const data = {
            msg,
            username
        }
        socket.emit("chat message", data);
    }
    $("#message").val("");
    $("#message").val();
});

socket.on("received", (message) => {
    console.log(message);
    let  li  =  document.createElement("li");
    messages.appendChild(li).append(message.msg);
    let  span  =  document.createElement("span");
    messages.appendChild(span).append("by "  +  message.username);
    messages.scrollTop = messages.scrollHeight;
})