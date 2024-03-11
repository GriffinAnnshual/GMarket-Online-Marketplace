import { createClient } from "redis"



export const connectRedis = async() =>{
    // Initialize redis client
    const client = await createClient({
        password: process.env.REDIS_SECRET,
        socket: {
            host: "redis-18218.c326.us-east-1-3.ec2.cloud.redislabs.com",
            port: 18218,
        },
    })
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect()
    console.log(client.isReady)
    return client;
}