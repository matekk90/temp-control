'use strict';


class DashboardController {
    constructor($http, $log, $scope, $timeout, socket) {
        this.$http = $http;
        this.$log = $log;
        this.$timeout = $timeout;
        this.socket = socket;
        this.sensors = [];
        this.selectedSensorIndex = {};
        this.measures = [];
        this.onInit();

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('sensor');
        });
    }

    onInit() {
        this.$log.debug('Initializing DashboardController');
        this.$http.get('/api/sensors').then(response => {
            this.sensors = response.data;
            this.socket.syncUpdates('sensor', this.sensors, this.sensorUpdated);
            this.$timeout(this.addRandomMeasure(), 30000000);
        });
    }

    addMeasure() {
        if (this.measure) {
            this.$log.debug('Adding measure', this.measure);
            this.$http.patch('/api/sensors/' + this.measure.sensorId, {
                measures: {value: this.measure.value, date: this.measure.timestamp}
            });
            this.measure = '';
        }
    }

    addRandomMeasure() {
        this.$log.debug('Adding random measure');
        this.$http.patch('/api/sensors/' + this.sensors[0]._id, {
            measures: {value: Math.floor(Math.random() * 100), date: new Date()}
        });
        // this.$timeout(this.addRandomMeasure(), 30000000);
    }

    addSensor() {
        if (this.sensor) {
            this.$log.debug('Adding sensor', this.sensor);
            this.$http.post('/api/sensors', {
                name: this.sensor.name
            });
            this.sensor = '';
        }
    }

    selectSensor(id) {
        this.$log.debug('Selected sensor with id', id);
        this.selectedSensorIndex = _.findIndex(this.sensors, {_id: id});
    }

    sensorUpdated(event, item, array) {
        console.log('Updated sensor data', event, item, array);
    }

    deleteSensor(sensor) {
        this.$http.delete('/api/sensors/' + sensor._id);
    }
}

angular.module('tempControlApp')
    .controller('DashboardController', DashboardController);

