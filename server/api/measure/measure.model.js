'use strict';

import mongoose from 'mongoose';

var MeasureSchema = new mongoose.Schema({
  temperature: Number,
  date: Date,
  sensorId: String
});

export default mongoose.model('Measure', MeasureSchema);
