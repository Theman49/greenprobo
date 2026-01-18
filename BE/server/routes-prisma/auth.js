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

router.get('/check', (req, res) => {
    res.send("API OK").status(200);
})

// This section will help you create a new record.
router.post("/auth", async (req, res) => {
    try {
        let collectionName = '';
        let getUser = [];
        if(req.body.type === 'admin'){
            getUser = await prisma.admins.findFirst({
                where: {
                    username: req.body.username
                }
            })
        }else if(req.body.type === 'customer'){
            getUser = await prisma.customers.findFirst({
                where: {
                    username: req.body.username
                }
            })
        }

        if(!getUser){
            res.status(200).send({
                message: "Incorrect username or password",
                success: false
            });
        }else{
            if(getUser.password !== req.body.password){
                res.status(200).send({
                    message: "Incorrect username or password",
                    success: false
                })
            }else{
                res.status(200).send({
                    message: "Success to login",
                    success: true,
                    data: getUser
                })

            }
        }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error login");
    }
  });

export default router