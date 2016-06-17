'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var measureCtrlStub = {
  index: 'measureCtrl.index',
  show: 'measureCtrl.show',
  create: 'measureCtrl.create',
  update: 'measureCtrl.update',
  destroy: 'measureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var measureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './measure.controller': measureCtrlStub
});

describe('Measure API Router:', function() {

  it('should return an express router instance', function() {
    expect(measureIndex).to.equal(routerStub);
  });

  describe('GET /api/measures', function() {

    it('should route to measure.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'measureCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/measures/:id', function() {

    it('should route to measure.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'measureCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/measures', function() {

    it('should route to measure.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'measureCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/measures/:id', function() {

    it('should route to measure.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'measureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/measures/:id', function() {

    it('should route to measure.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'measureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/measures/:id', function() {

    it('should route to measure.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'measureCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
