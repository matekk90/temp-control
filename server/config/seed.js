/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Sensor from '../api/sensor/sensor.model';
import User from '../api/user/user.model';

Sensor.find({}).remove()
    .then(function () {
        Sensor.create({
            name: 'Fermentation'
        }, {
            name: 'Kegerator'
        });
    })
;

User.find({}).remove()
    .then(function () {
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
            .then(function () {
                console.log('finished populating users');
            })
        ;
    })
;
