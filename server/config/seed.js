/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Sensor from '../api/sensor/sensor.model';
import User from '../api/user/user.model';

Sensor.find({}).remove()
  .then(() => {
    Sensor.create({
      name: 'ds18b20'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'matekk90@gmail.com',
      password: 'qwerty'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
