const client = require('./config/redisClient/client');
async function init() {
     const result = await client.get('name')
     console.log(result);
}
init();