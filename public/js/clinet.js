const socket  = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");


const user_name = prompt("Enter your name");
socket.emit('new-user-con', user_name);

function nameprint(message, position){
    const messageElemet = document.createElement('div');
    messageElemet.innerHTML = message;
    messageElemet.classList.add('message')
    messageElemet.classList.add(position)
    messageContainer.append(messageElemet);

}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    nameprint(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';
});

function username(message){
    const user_joined = document.createElement('div');
    user_joined.className = 'joined_container';
    const messageElemet = document.createElement('div');
    messageElemet.innerHTML = message;
    messageElemet.className ='joined';
    user_joined.appendChild(messageElemet);
    messageContainer.appendChild(user_joined);
}

socket.on('user-con', name =>{
    username(`${name} Joined the chat`);
});

socket.on('receive', data =>{
    nameprint(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name =>{
    username(`${name} left the chat`);
});