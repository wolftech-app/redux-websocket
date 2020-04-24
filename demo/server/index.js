const WebSocket = require('ws');
const crypto = require('crypto');

const { PORT = 3000 } = process.env;

// Create the server.
const wss = new WebSocket.Server({
  port: PORT,
});

wss.on('listening', () => {
  console.log(`--> Listening for connections on port ${PORT}`);
});

wss.on('close', () => {
  console.log('--> Closed connection');
});

wss.on('error', err => {
  console.log('--> Error');

  console.error(err);
});

// When a client connects, echo messages back.
wss.on('connection', ws => {
  const id = crypto.randomBytes(16).toString('hex');

  console.log(
    '--> Connection received. ID:',
    id,
    `There are ${wss.clients.size} clients connected.`,
  );

  // Listen for pongs.
  ws.on('pong', () => {
    console.log(`${id}: Pong!`);
  });

  ws.on('message', msg => {
    ws.send(msg);
  });
});

setInterval(() => {
  console.log(`--> Sending pings to ${wss.clients.size} clients`);

  wss.clients.forEach(w => {
    w.ping();
  });
}, 10000);
