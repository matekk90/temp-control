'use strict';


class DashboardController {
    constructor($filter, $http, $log, $scope, $timeout, socket) {
        this.$filter = $filter;
        this.$http = $http;
        this.limit = 100;
        this.$log = $log;
        this.$timeout = $timeout;
        this.socket = socket;
        this.sensors = [];
        this.showChart = true;
        this.showId = false;
        this.onInit();

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('sensor');
        });

        $scope.$watch(angular.bind(this, function() {
            return this.limit;
        }), angular.bind(this, function(newValue, oldValue) {
            this.$log.debug('Limit changed to', newValue);
            this.sensors.data = this.prepareData(this.sensors);
        }));

    }


    onInit() {
        this.$log.debug('Initializing DashboardController');
        this.$http.get('/api/sensors').then(response => {
            this.sensors = response.data;
            this.socket.syncUpdates('sensor', this.sensors, this.sensorUpdated, this);
            this.sensors.data = this.prepareData(this.sensors);
        });
    }

    selectSensor(id) {
        this.$log.debug('Selected sensor with id', id);
        this.selectedSensorIndex = _.findIndex(this.sensors, {_id: id});
        this.sensors.data = this.prepareData(this.sensors);
        this.$log.debug('Measures', this.data);

    }

    sensorUpdated(event, item, array, param) {
        param.$log.debug('Updated sensor data', event, item, array);
        param.sensors.data = param.prepareData(param.sensors);
        param.$log.debug('Measures', param.sensors.data);

    }

    deleteSensor(sensor) {
        this.$http.delete('/api/sensors/' + sensor._id);
    }

    options = {
        chart: {
            type: 'lineChart',
            height: 300,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function (d) {
                return Date.parse(d.date);
            },
            y: function (d) {
                return d.value;
            },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function (e) {
                    console.log('stateChange');
                },
                changeState: function (e) {
                    console.log('changeState');
                },
                tooltipShow: function (e) {
                    console.log('tooltipShow');
                },
                tooltipHide: function (e) {
                    console.log('tooltipHide');
                }
            },
            xAxis: {
                axisLabel: 'Time',
                tickFormat: function (d) {
                    return new Date(d).toLocaleTimeString();
                }
            },
            yAxis: {
                axisLabel: 'Temperature (°C)',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log('!!! lineChart callback !!!');
            }
        },
        title: {
            enable: true,
            text: 'Temparature Line Chart'
        }
    };

    colors = ['#1976D2', '#4CAF50', '#D32F2F', '#7C4DFF', '#9E9E9E'];

    prepareData = function (sensors) {
        var data = [];
        for (var i = 0; i < sensors.length; i++) {
            data.push({
                values: this.$filter('limitTo')(sensors[i].measures, (-1) * this.limit),
                key: sensors[i].name,
                color: this.colors[i]
            });
        }

        return data;
    };
}

angular.module('tempControlApp')
    .controller('DashboardController', DashboardController);

