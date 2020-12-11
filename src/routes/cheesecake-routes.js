'use strict';

require('dotenv').config();
const express = require('express');
const CheesecakeSource = require('../models/cheesecake-source');


const CheesecakeModel = require('../models/cheesecake-model'); //class that lets us use CRUD to interact with in memory db
//const cheesecake = new Cake();  //makes a new instance of our class
const cheesecake = new CheesecakeSource();
const router = express.Router(); // built component of express that lets use modularize routes
let createCake = async (req, res) => {
  let newCake = await cheesecake.create(req.body);
  res.status(200).json(newCake);
};

let allSlices = async (req, res) => {
  let moreCake = await cheesecake.get();
  res.status(200).json(moreCake);
};

let oneSlice = async (req, res) => {
  let lessCake = await cheesecake.get(req.params.id);
  res.status(200).json(lessCake);
};

let changeSlice = async (req, res) => {
  let updateSlice = await cheesecake.update(req.params.id);
  res.status(200).json(updateSlice);

};

let deleteSlice = async (req, res) => {
  let throwAwaySlice = await cheesecake.delete(req.params.id);
  res.status(200).json(throwAwaySlice);
};

router.get('/cake', allSlices);
router.get('/cake/:id', oneSlice);
router.post('/cake', createCake);
router.put('/cake/:id', changeSlice);
router.delete('/cake/:id', deleteSlice);

module.exports = router;

// const makeCheesecake = async () => {
//   let jam = {
//     name: 'Jam',
//     calories: 250,
//     type: 'SWEDISH',
//   };
//   //save into collection
//console.log('Bake Slice', newCake);
//   // get one slice
//   let oneSlice = await cheesecake.get(cheesecake._id);
//   console.log('One slice', oneSlice);

//   //get all things from cakes
//   let allSlices = await cheesecake.get();
//   console.log('All Slices', allSlices);
//   let changeSlice = await cheesecake.update(cheesecake._id, jam);
//   console.log('Switch Slices', changeSlice);
//   let deleteSlice = await cheesecake.update(cheesecake._id);
//   console.log('Throw away Slice', deleteSlice);
//   //disconnect from mongo
//   mongoose.disconnect();
// };
// makeCheesecake();

