const redis = require("redis");

const redisClient = redis.createClient(6379, 'localhost', {});
const listenerRedisClient = redis.createClient(6379, 'localhost', {});

let key="TEST";
let todayEnd = new Date().setHours(12, 55, 35, 999);

redisClient.on("connect", function () {
    console.log('info', "redis connected " + this.connected);
}).on("error", function () {
    console.log('info', "redis connect error " + this.connected);
}).on("end", function () {
    console.log('info', "redis disconnected" + this.connected);
});


listenerRedisClient.on("pmessage", function (pattern, channel, expiredKey) {
    if (expiredKey) {
        console.log('CRON EVENT EXPIRED ', expiredKey);
    }
});

listenerRedisClient.psubscribe("__keyevent@0__:expired");

redisClient.set(key, {}, function (err, result) {
    if (!err) {
        redisClient.expireat(key, parseInt(todayEnd/1000), function (err, result) {
            
        })
    } else {
        console.log(err)
    }
});

