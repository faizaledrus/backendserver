
import express from "express"

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const notifyWallet = express.Router();

// This will help us connect to the database
// const dbo = require("../db/conn");
import dbo from "../db/conn.js"

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;
import { ObjectId } from "mongodb"

notifyWallet.route("/addwallet").post(async function (req, response) {
    // console.log(req)
    let db_connect = dbo.getDb();

    const user = await db_connect.collection("user").findOne({ address: req.body.address })

    const options = { upsert: true };
    if (user === null) {
        return response.json({
            status: false,
            message: "user belum terdaftar"
        })
    } else {
        if (typeof user.wallet === "undefined") {
            user.wallet = []
            user.wallet.push(req.body.wallet)
            await db_connect.collection("user").updateOne({ address: req.body.address }, { wallet: [...user.wallet], options })
        }
        else {
            const unique = user.wallet.filter(res => res.wallet === req.body.wallet.wallet)
            if (unique.length > 0) {
                return response.json({
                    status: false,
                    message: "wallet sudah terdaftar"
                })
            }
            else {
               const temp= user.wallet
               temp.push(req.body.wallet)
                await db_connect.collection("user").updateOne({ address: req.body.address }, { "$set": {wallet:temp} }, options )
                return response.json({
                    status: true,
                    data: user
                })
            }
        }
    }
});
notifyWallet.route("/getwallet").get(async function (req, response) {
    // console.log(req)
    const {id}=req.query
    let db_connect = dbo.getDb();
    const user = await db_connect.collection("user").findOne({ address: id })
    if (user === null) {
        return response.json({
            status: false,
            message: "user belum terdaftar"
        })
    } else {
      return response.json({
          status:true,
          wallet:user.wallet
      })
    }
});
export default notifyWallet