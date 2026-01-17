import express from "express";

// This will help us connect to the database
// import db from "../db/connection.js";
import { prisma } from '../../prisma/lib/prisma.ts'

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you delete a record by id.
router.delete("/deposit-histories/:id", async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection("depositHistories");
    let result = await collection.deleteOne(filter);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record customers");
  }
});

// This section will help you update a record by id.
router.patch("/deposit-histories-edit/:id", async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection("depositHistories");
    let find = await collection.find(filter).toArray();
    console.log(find)
    console.log(req.body)

    if(req.body.isAdmin && req.body.code === find[0].admin.code){
      let resDelete = await collection.deleteOne(filter);
      let result = await collection.insertOne(req.body.payload)
      res.send(result).status(200);
    }else{
      res.status(500).send("Error updating record deposit history");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record deposit history");
  }
});

router.post("/deposit-histories-detail", async (req, res) => {
  try {
    const query = await prisma.transactions.findMany()
    const data = query.map((item) => {
      return {
        transaction: item, 
        ...JSON.parse(item.detail)
      }
    })
    const result = data.filter((item) => {
      if(item.transaction.noFactur == req.body.noFactur){
        if(req.body.isAdmin && item.admin.code == req.body.code){
          return item
        }else{
          if(item.customer.code == req.body.code){
            return item
          }
        }
      }
  })

    console.log("result", result)

    res.send(result).status(200);
  }catch(err){
    console.error(err);
    res.status(500).send("Error getting record");
  }
});


// This section will help you get record for index.
router.post("/deposit-histories-index", async (req, res) => {
  try {
    let filter = {
      "customer.code": req.body.code
    };
    if(req.body.isAdmin){
      filter = {
        "admin.code": req.body.code,
      }
    }
    const query = await prisma.transactions.findMany()
    const data = query.map((item) => {
      return {
        transaction: item, 
        ...JSON.parse(item.detail)
      }
    })

    const result = data.filter((item) => {
      if(req.body.isAdmin){
        if(item.admin.code == req.body.code){
          return item
        }
      }{
        if(item.customer.code == req.body.code){
          return item
        }

      }
    })

    console.log("RESULT", result)
    res.send(result).status(200);
  }catch(err){
    console.error(err);
    res.status(500).send("Error getting record");
  }
});

// This section will help you create a new record.
router.post("/deposit-histories", async (req, res) => {
  try {
    console.log("PAYLOAD", req.body);

    const detail = JSON.stringify({
      trash: req.body.trash,
      customer: req.body.customer,
      admin: req.body.admin,
    })

    const payload = {
      ...req.body.transaction,
      detail: detail
    }
    const lastData = await prisma.transactions.findMany({
      where: {
        type: req.body.transaction.type,
        month: req.body.transaction.month,
        year: req.body.transaction.year,
      }
    })

    const maxLengthId = 3
    let nextId = 1;

    if(lastData.length > 0){
      nextId += lastData.length
    }

    let genId = "";
    if(nextId.toString().length < maxLengthId){
      for(let i=0; i<maxLengthId - nextId.toString().length; i++){
        genId += '0'
      }
      genId += `${nextId}/`;
    }
    payload.noFactur = genId + req.body.transaction.noFactur
    console.log(payload);
    // const noFactur = req.body.transaction.noFactur;
    let result = await prisma.transactions.create({
      data: payload
    });
    res.send(result).status(204);
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});


export default router;