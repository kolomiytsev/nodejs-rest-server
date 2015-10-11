'use strict';

var should = require('should');
var request = require('supertest');

describe('Rest server tests', function () {
    beforeEach(function () {
        this.request = request('http://localhost:5999/users')
    });

    afterEach(function () {
        this.request = null
    });

    describe('#end/positive', function () {
        it('should return response 200 for request', function (done) {
            this.request.get('/')
                //.expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        })
    });
    //describe('#add/positive', function () {
    //    it('should add numbers', function (done) {
    //        this.request.post('/actions/add')
    //            .send({
    //                num1: 1,
    //                num2: -5
    //            })
    //            .expect('Content-Type', /json/)
    //            .expect(200)
    //            .end(function (err, response) {
    //                if (err) {
    //                    return done(err)
    //                }
    //
    //                response.body.should.match({
    //                    result: -4
    //                })
    //
    //                done(null)
    //            });
    //    })
    //})
    //
    //describe('#add/negative', function () {
    //    it('should return 400 and validation error if add null', function (done) {
    //        this.request.post('/actions/add')
    //            .send({
    //                num1: null,
    //                num2: null
    //            })
    //            .expect('Content-Type', /json/)
    //            .expect(400)
    //            .end(function (err, response) {
    //                if (err) {
    //                    return done(err)
    //                }
    //
    //                response.body.should.match({
    //                    error: /^Argument error/
    //                })
    //
    //                done(null)
    //            });
    //    })
    //})
});
