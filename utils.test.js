const U = require('./utils.js');

describe("randomRGB", function() {
  // Use the special '__get__' accessor to get your private function.
  it("should return a random RGB of proper length", function(done) {
      var stuff = U.randomRGB();
      let spl=stuff.split(",");
      expect(spl.length).toBe(4);
      done();
    });

    it("should always return opacity 1.0", function(done) {
      let randos=[];
      for (var i=0;i<10;i++) { randos.push(U.randomRGB()); }
      let opacity=randos.map(e=>e.split(",")[3]).map(e=>e.replace(/[^0-9.]/gi,''));
      let opacityNotOne=opacity.filter(e=>e!=='1.0');
      expect(opacityNotOne.length).toBe(0);
      done();
      });
  });

describe("randomURL", function() {
        it("should return a URL with three words", function(done) {
            var stuff = U.randomURL();
            let spl=stuff.split("-");
            expect(spl.length).toBe(3);
            done();
          });

          it("should contain no duplicate words", function(done) {
              var stuff = U.randomURL();
              let spl=stuff.split("-");
              let dupes=spl.filter((e,idx)=>idx!==spl.lastIndexOf(e));
              expect(dupes.length).toBe(0);
              done();
            });
        });

//TODO removeByElement
//TODO removeByIndex

describe("remove", function() {
    it("should return null if not given array or ele", function(done) {
        var stuff = U.remove();
        expect(stuff).toEqual(null);
        done();
      });
    it("should return null if not given array of type array", function(done) {
        var stuff = U.remove('string',1);
        expect(stuff).toEqual(null);
        done();
      });
    it("should return null if given array of type array but not ele", function(done) {
        var stuff = U.remove([1,2,3,4,5]);
        expect(stuff).toEqual(null);
        done();
      });
    it("should return null if given array of type array and ele not in array", function(done) {
        var stuff = U.remove([1,2,3,4,5],"ELEMENT");
        expect(stuff).toEqual(null);
        done();
      });
    it("should remove element if given array of type array and ele present in array", function(done) {
        var stuff = U.remove([1,2,3,4],4);
        expect(stuff).toEqual([1,2,3]);
        done();
      });
    });

describe("randomRGB", function() {
    // Use the special '__get__' accessor to get your private function.
  it("should return a random RGB of proper length", function(done) {
      var stuff = U.randomRGB();
      let spl=stuff.split(",");
      expect(spl.length).toBe(4);
      done();
    });

    it("should always return opacity 1.0", function(done) {
      let randos=[];
      for (var i=0;i<10;i++) { randos.push(U.randomRGB()); }
      let opacity=randos.map(e=>e.split(",")[3]).map(e=>e.replace(/[^0-9.]/gi,''));
      let opacityNotOne=opacity.filter(e=>e!=='1.0');
      expect(opacityNotOne.length).toBe(0);
      done();
      });
  });

describe("promote", function() {
    it("should return an array", function(done) {
        var res = U.promote([],1);
        expect(Array.isArray(res)).toBe(true);
        done();
      });

    it("should return input array unchanged if promoting first element", function(done) {
        var res = U.promote([1,2,3,4],1);
        expect(JSON.stringify(res)).toBe(JSON.stringify([1,2,3,4]));
        done();
      });

    it("should return input array unchanged if element not in array", function(done) {
        var res = U.promote([1,2,3,4],5);
        expect(JSON.stringify(res)).toBe(JSON.stringify([1,2,3,4]));
        done();
      });

    it("should return input array with element promoted", function(done) {
        var res = U.promote([1,2,3,4],2);
        expect(JSON.stringify(res)).toBe(JSON.stringify([2,1,3,4]));
        done();
      });
    });

/* TODO

randHex
randomString
rIn
rArr
*/
