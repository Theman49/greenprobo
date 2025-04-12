import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the inventory.
router.get("/customers", async (req, res) => {
  let collection = await db.collection("customers");
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

export default router;