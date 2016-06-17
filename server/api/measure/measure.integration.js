'use strict';

var app = require('../..');
import request from 'supertest';

var newMeasure;

describe('Measure API:', function() {

  describe('GET /api/measures', function() {
    var measures;

    beforeEach(function(done) {
      request(app)
        .get('/api/measures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          measures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(measures).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/measures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/measures')
        .send({
          name: 'New Measure',
          info: 'This is the brand new measure!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMeasure = res.body;
          done();
        });
    });

    it('should respond with the newly created measure', function() {
      expect(newMeasure.name).to.equal('New Measure');
      expect(newMeasure.info).to.equal('This is the brand new measure!!!');
    });

  });

  describe('GET /api/measures/:id', function() {
    var measure;

    beforeEach(function(done) {
      request(app)
        .get('/api/measures/' + newMeasure._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          measure = res.body;
          done();
        });
    });

    afterEach(function() {
      measure = {};
    });

    it('should respond with the requested measure', function() {
      expect(measure.name).to.equal('New Measure');
      expect(measure.info).to.equal('This is the brand new measure!!!');
    });

  });

  describe('PUT /api/measures/:id', function() {
    var updatedMeasure;

    beforeEach(function(done) {
      request(app)
        .put('/api/measures/' + newMeasure._id)
        .send({
          name: 'Updated Measure',
          info: 'This is the updated measure!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMeasure = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeasure = {};
    });

    it('should respond with the updated measure', function() {
      expect(updatedMeasure.name).to.equal('Updated Measure');
      expect(updatedMeasure.info).to.equal('This is the updated measure!!!');
    });

  });

  describe('DELETE /api/measures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/measures/' + newMeasure._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when measure does not exist', function(done) {
      request(app)
        .delete('/api/measures/' + newMeasure._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
