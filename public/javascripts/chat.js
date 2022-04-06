const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages")

//Get username and oom form URL 
const {room} = Qs.parse(location.search.replace,{
    ignoreQueryPrefix: true
});

console.log(room);

const socket = io();

// Message server
socket.on("message", message => {
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Message submittion

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to the server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})


// output message to DOM

function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
    ${msg.text}
    </p>
    `;
    console.log(msg);
    document.querySelector(".chat-messages").appendChild(div);
}
