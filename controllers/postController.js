const fs = require("fs");
const axios = require("axios");
const redis =  require("redis");


const client = redis.createClient({
    url: 'redis://default:redispw@localhost:32768'
})

const postController = {
    getAllPosts: async (req, res) => {
        let response = "";
        //connect to redis
        await client.connect();

        //handle eny error if happens
        client.on('error', err => console.log('Redis Client Error', err));

        //call the redis saved data
        const value = await client.get("characters");

        if(value){
            response = JSON.parse(value);
        }else{
            //make the external call
            const call = await axios.get("https://rickandmortyapi.com/api/character");
            //set the response to be returned for now
            response = call.data;
            //do the set of the data in redis
            client.set("characters", JSON.stringify(call.data), (err, reply) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(reply)
                }
            });

        }

        //response will be the default response or redis
        res.status(200).json({
            data: response
        });
        
        //disconnect from redis
        await client.disconnect();

    }
}

module.exports = postController;