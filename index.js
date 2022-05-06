const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000 ;
const app=express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



// middelware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qb6yh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
      app.get('/items/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const item=await Itemscollection.findOne(query);
        res.send(item);


      });
      

      // delete..............................

      app.delete('/items/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const item=await Itemscollection.deleteOne(query);
        res.send(item);


      });

      // update.........................

      app.put('/items/:id',async(req,res)=>{
        const id=req.params.id;
        
        const updateitem=req.body;
       
        const query={_id:ObjectId(id)};
        const options={upsert:true};
        newitem={
          $set: {
            quantity:updateitem.newstock ,
          }
        };
        const update=await Itemscollection.updateOne(query,newitem,options);
        res.send(update);


      });

      // post.............................

      app.post('/items',async(req,res)=>{
        const newitems=req.body;
        
          const result= await Itemscollection.insertOne(newitems);
          res.send(result)

      });


      

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
