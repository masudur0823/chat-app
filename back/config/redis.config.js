const { createClient } = require('@redis/client');
const client = createClient({

  host: '127.0.0.1',    // Use your Redis server address
  port: 6379            // Use your Redis server port
});


client.connect();

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('close', () => {
  console.error('Redis connection closed');
});

module.exports = client;
