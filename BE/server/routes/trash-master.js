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
router.get("/trash-master", async (req, res) => {
  let collection = await db.collection("trashMaster");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/trash-master/:type", async (req, res) => {
  let collection = await db.collection("trashMaster");
  let query = { type: req.params.type };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});



// This section will help you update a record by id.
router.patch("/trash-master/:type/:code", async (req, res) => {
  try {
    let collection = await db.collection("trashMaster");
    const query = { type: req.params.type };
    /*
    const updates = {
      $set: {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        village: req.body.village,
        whatsapp: req.body.whatsapp,
      },
    };
    */

    await collection.updateOne(
      {type: req.params.type},
      {
        $pull: {
          data: {code: req.params.code}
        }
      }
    )

    let result = await collection.updateOne(
      {type: req.body.type},
      {
        $push: {
          data: {
            name: req.body.name,
            code: req.body.code,
            fee: req.body.fee,
          }
        }
      }
    )
    res.send(result).status(200);

    /*
    let collection = await db.collection("trashMaster");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
    */
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating trash record");
  }
});

// This section will help you create a new record.
router.post("/trash-master", async (req, res) => {
  try {
    let collection = await db.collection("trashMaster").find({type: req.body.type});
    console.log(collection)
    /*
    let result = await collection.updateOne(
      {type: req.body.type},
      {
        $push: {
          data: {
            name: req.body.name,
            code: req.body.code,
            fee: req.body.fee,
          }
        }
      }
    )
    res.send(result).status(204);
    */
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});


// This section will help you delete a record
router.delete("/trash-master/:type/:code", async (req, res) => {
  try {
    const collection = db.collection("trashMaster");
    let result = await collection.updateOne(
      {type: req.params.type},
      {
        $pull: {
          data: {code: req.params.code}
        }
      }
    )
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;