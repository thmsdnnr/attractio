const rewire = require('rewire');
const db = rewire('./db');

describe("connect", function() {
  // Use the special '__get__' accessor to get your private function.
  var connect = db.__get__('connect');

  it("should attempt to connect to the db", function(done) {
      var conn = connect(function(err, data) {
        expect(err).toBe(null);
        expect(data).toBe(null);
        done();
      });
    });
  });
