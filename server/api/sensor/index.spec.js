'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensorCtrlStub = {
  index: 'sensorCtrl.index',
  show: 'sensorCtrl.show',
  create: 'sensorCtrl.create',
  update: 'sensorCtrl.update',
  destroy: 'sensorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensor.controller': sensorCtrlStub
});

describe('Sensor API Router:', function() {

  it('should return an express router instance', function() {
    expect(sensorIndex).to.equal(routerStub);
  });

  describe('GET /api/sensors', function() {

    it('should route to sensor.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sensorCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sensors/:id', function() {

    it('should route to sensor.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sensorCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sensors', function() {

    it('should route to sensor.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sensorCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensors/:id', function() {

    it('should route to sensor.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sensorCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensors/:id', function() {

    it('should route to sensor.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sensorCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensors/:id', function() {

    it('should route to sensor.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sensorCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
