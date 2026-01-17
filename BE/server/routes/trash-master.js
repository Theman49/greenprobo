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

// This section will help you get a list of all the inventory.
router.get("/trash-master", async (req, res) => {
  let query = await prisma.trash_master.findMany({
    distinct: 'type',
    select: {
      type: true,
    }
  });

  const data = await prisma.trash_master.findMany()

  let results = query.map((item) => {
    return {
      type: item.type,
      data: data.filter((raw) => raw.type == item.type) 
    }
  })
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
router.patch("/trash-master/:id", async (req, res) => {
  try {
    let result = await prisma.trash_master.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
            type: req.body.type,
            name: req.body.name,
            code: req.body.code,
            fee: parseInt(req.body.fee),

      }
    })
    res.send(result).status(200);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating trash record");
  }
});

// This section will help you create a new record.
router.post("/trash-master", async (req, res) => {
  try {
    const newData = await prisma.trash_master.create({
      data: {
        type: req.body.type,
        name: req.body.name,
        code: req.body.code,
        fee: parseInt(req.body.fee),
      }
    })
    res.send(newData).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});


// This section will help you delete a record
router.delete("/trash-master/:id", async (req, res) => {
  try {
    let result = await prisma.trash_master.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;