const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://travel-agency:KLHIDRkl0Ypvoneo@cluster0.a0htp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{

        await client.connect()
        const database = client.db("travel-agency");
        const collection = database.collection("destination");

        const ordersCollection = database.collection("orders");

        app.get('/events',async(req,res)=>{
            const eventsData = await collection.find({}).toArray();
            console.log(eventsData)
            res.json(eventsData);
        })

        app.get('/orders',async(req,res)=>{
            const orderData = await ordersCollection.find({}).toArray();
            console.log(orderData)
            res.json(orderData);
        })

        app.post('/events',async(req,res)=>{
            const newEvent = req.body;
            const result = await collection.insertOne(newEvent)
            console.log('hitting the post ',req.body)
            res.json(result);
        })

        app.post('/orders',async(req,res)=>{
            const newOrder = req.body;
            const result = await ordersCollection.insertOne(newOrder)
            console.log('hitting the post ',req.body)
            res.json(result);
        })



    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir())



app.get('/',(req,res)=>{
    console.log('server is running');
    res.send('Hello polapan, Matha ghuranti ditache.')
})

app.listen(port,()=>{
    console.log('listening to the port',port)
})


