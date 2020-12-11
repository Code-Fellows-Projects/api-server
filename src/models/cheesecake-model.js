'use strict';

const mongoose = require('mongoose');

// make a schema

const cheesecakeSchema = mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  type: { type: String, uppercase: true, enum: ['CLASSIC', 'SAVORY', 'RICOTTA', 'NEWYORK', 'SWEDISH'] },
});

// export schema as a model
const cheesecakeModel = mongoose.model('food', cheesecakeSchema);

module.exports = cheesecakeModel;