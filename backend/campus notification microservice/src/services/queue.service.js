const Queue = require("bull");

const queue = new Queue("notifications", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

queue.process(async (job) => {
  console.log("Sending batch:", job.data.users.length);
});

module.exports = queue;