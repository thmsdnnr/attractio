const rewire = require('rewire');
const attractio = rewire('attractio.js');

describe("addWords", function() {
  // Use the special '__get__' accessor to get your private function.
  var addWords = attractio.__get__('addWords');

  it("should return an array of length 3", function(done) {
      var res = addWords();
      expect(res.length).toBe(3);
      done();
    });
});
