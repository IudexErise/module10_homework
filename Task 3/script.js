const wsUrl = "wss://echo-ws-service.herokuapp.com";
const output = document.querySelector(".output");
const sendButton = document.querySelector('.send');
const geoButton = document.querySelector('.geo');
const mapLink = document.querySelector('.mapLink');
const websocket = new WebSocket(wsUrl);;

function writeToScreen(message) {
  let add = document.createElement("p");
  add.className = "chat-message";
  add.innerHTML = message;
  output.appendChild(add);
}

sendButton.addEventListener('click', () => {
    let message = document.querySelector('.input').value;
  writeToScreen("I: " + message);
  websocket.send(message);
  websocket.onmessage = function(event) {
    writeToScreen('Server: ' + event.data);};        
  websocket.onerror = function(event) {
    writeToScreen('Server: ERROR' + event.data);
  };
});

const error = () => {
  writeToScreen = 'Can`t get your geolocation';
};
  
 const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.className = `chat-message`;
  mapLink.textContent = 'Geolocation';
   output.appendChild(mapLink);
};

geoButton.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    output.textContent = 'Geolocation is not supported';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});