// const express = require("express");
import express from "express"

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
// const dbo = require("../db/conn");
import dbo from "../db/conn.js"

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;
import { ObjectId } from "mongodb"

// This section will help you get a list of all the records.
recordRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("userRecord")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/create-user").post(async function (req, response) {
  // console.log(req)
  let db_connect = dbo.getDb();

  const user = await db_connect.collection("user").findOne({ address: req.body.address })

  if (user === null) {
    db_connect.collection("user").insertOne({ ...req.body,wallet:[] }, function (err, res) {
      if (err) {
        return response.json({
          status: false,
          message: err
        })
      };
      return response.json({ ...req.body, status: true });
    });
  } else {
    return response.json({
      status: true,
      user
    })
  }
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("userRecords")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

export default recordRoutes
// module.exports = recordRoutes;