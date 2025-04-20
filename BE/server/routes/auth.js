import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();


// This section will help you create a new record.
router.post("/auth", async (req, res) => {
    try {
        let collectionName = '';
        if(req.body.type === 'admin'){
            collectionName = 'admins';
        }else if(req.body.type === 'customer'){
            collectionName = 'customers';
        }
        const getUser = await db.collection(collectionName).
            find({username: req.body.username}).toArray()

        if(getUser.length === 0){
            res.status(200).send({
                message: "Incorrect username or password",
                success: false
            });
        }

        if(getUser[0].password !== req.body.password){
            res.status(200).send({
                message: "Incorrect username or password",
                success: false
            })
        }else{
            res.status(200).send({
                message: "Success to login",
                success: true,
                data: getUser[0]
            })

        }


    } catch (err) {
      console.error(err);
      res.status(500).send("Error login");
    }
  });

export default router