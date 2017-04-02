var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var db = require('../db');

describe('DB', function() {
    it('should connect to the database', function() {
        db.connect(db.MODE_PRODUCTION, function(err) {
            expect(err).to.equal(undefined);
        });
    });
});