const WebSocket = require('ws');
const newConnection = require("./modules/new-connection");

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', newConnection);


//open up port on ec2 instance
//sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

//iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

//sudo iptables -A INPUT -p tcp --dport 81 -j ACCEPT
//iptables -t nat -A PREROUTING -p tcp --dport 81 -j REDIRECT --to-port 8081