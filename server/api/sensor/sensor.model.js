'use strict';

import mongoose from 'mongoose';

var SensorSchema = new mongoose.Schema({
  name: String,
  measures: [{value: Number, date: Date}]
});

export default mongoose.model('Sensor', SensorSchema);

