const express = require('express');
const cors = require('cors');
require('dotenv').conflig;
const port=process.env.PORT || 5000 ;
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');


// middelware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://Deponic:HmpspJu0CcrrnDcR@cluster0.qb6yh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const Itemscollection=client.db("Deponic").collection("Items");
        console.log('mogo');
        
      app.get('/items',async(req,res)=>{

        const query = {};
        const cursor = Itemscollection.find(query);
        const Allitems= await cursor.toArray();
        res.send(Allitems);
      })


    }


    finally{

    }

}
run().catch(console.dir);



app.get('/',(req,res)=>{

    res.send('hello world')
})

app.listen(port,()=>{
    console.log('mongo is fine');
})
