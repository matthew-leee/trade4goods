'use strict';
module.exports = redis => redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)