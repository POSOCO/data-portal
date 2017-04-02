var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Approval = require('../../models/approval');

describe('Approval Model', function () {
    it('should get the Approvals list and have properties description, id', function () {
        Approval.get(null, function (err, rows) {
            expect(err).to.equal(null);
            expect(rows.length).to.be.above(0);
            expect(rows[0]).to.have.property('description');
            expect(rows[0]).to.have.property('id');
            //console.log("Application get result is " + JSON.stringify(rows));
        });
    });

    it('should create an approval,update and delete it based on appplication number 2', function () {
        var testingId = null;
        Approval.create(2, "from_test", 299, 299, 299, 299, "2016-11-09T14:01", "2016-11-09T14:01", 2, function (err, result) {
            expect(err).to.equal(null);
            testingId = result.insertId;
            expect(testingId).to.not.equal(null);
            console.log("Approval create insertId is " + result.insertId);

            Approval.update(testingId, 2, "from_test", 299, 299, 299, 299, "2016-11-09T14:01", "2016-11-09T14:01", 2, 4000, function (err, result) {
                expect(err).to.equal(null);
                console.log("Approval update result is " + JSON.stringify(result));

                Approval.delete(testingId, function (err, result) {
                    expect(err).to.equal(null);
                    console.log("Approval delete result is " + JSON.stringify(result));
                });
            });
        });
    });
});