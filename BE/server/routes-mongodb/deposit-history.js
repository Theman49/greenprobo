import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

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
    let filter = {
      "transaction.noFactur": req.body.noFactur,
    };
    if(req.body.isAdmin){
      filter["admin.code"] = req.body.code
    }else{
      filter["customer.code"] = req.body.code
    }
    const data = await db.collection('depositHistories').
                  find(filter).
                  toArray();
    
    console.log("DATA", data)

    res.send(data).status(200);
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
    const data = await db.collection('depositHistories').
                  find(filter).
                  toArray();

    console.log(data, req.body)
    res.send(data).status(200);
  }catch(err){
    console.error(err);
    res.status(500).send("Error getting record");
  }
});

// This section will help you create a new record.
router.post("/deposit-histories", async (req, res) => {
  try {
    const lastData = await db.collection('depositHistories').
                  find({
                    "transaction.type": req.body.transaction.type,
                    "transaction.month": req.body.transaction.month,
                    "transaction.year": req.body.transaction.year,
                  }).
                  toArray();

    const payload = req.body;
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
    payload.transaction.noFactur = genId + req.body.transaction.noFactur
    console.log(payload);
    // const noFactur = req.body.transaction.noFactur;
    let collection = await db.collection("depositHistories");
    let result = await collection.insertOne(payload);
    res.send(result).status(204);
    /*
    const lastData = await db.collection('depositHistories').
                  find({}, {projection: {code: 1}}).
                  sort({code: -1}).
                  limit(1).
                  toArray();

    const lastCode = parseInt(lastData[0].code);
    const newCode = `0${lastCode + 1}`;
    let newDocument = {
      code: newCode,
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      village: req.body.village,
      whatsapp: req.body.whatsapp,
    };
    let collection = await db.collection("customers");
    let result = await collection.insertOne(newDocument);
    */
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

/*
// This section will help you get a list of all the inventory.
router.get("/deposit-histories", async (req, res) => {
  let collection = await db.collection("depositHistories");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/customers/:id", async (req, res) => {
  let collection = await db.collection("customers");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/customers", async (req, res) => {
  try {
    const lastData = await db.collection('customers').
                  find({}, {projection: {code: 1}}).
                  sort({code: -1}).
                  limit(1).
                  toArray();

    const lastCode = parseInt(lastData[0].code);
    const newCode = `0${lastCode + 1}`;
    let newDocument = {
      code: newCode,
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      village: req.body.village,
      whatsapp: req.body.whatsapp,
    };
    let collection = await db.collection("customers");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/customers/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        village: req.body.village,
        whatsapp: req.body.whatsapp,
      },
    };

    let collection = await db.collection("customers");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record customers");
  }
});


// This section will help you delete a record
router.delete("/customers/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("customers");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});
*/

export default router;