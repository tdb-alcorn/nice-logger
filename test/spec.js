var assert = require("assert");
var Logger = require("../logger.js");

var log = new Logger("test", "debug");

console.log("Begin test output of logger:");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

function logAll() {
    var m = "A message.";
    log.debug(m);
    log.info(m);
    log.warning(m);
    log.error(m);
    log.critical(m);
}

logAll();
log.info("Logging an object without a .constructor should not throw an error", undefined);

log.setLevel("error");
logAll();

var em = "This is a test error. Here is the stack trace:";
var err = new Error(em);
log.error(err);
var err = new TypeError(em);
log.error(err);

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("End test output of logger.");

describe("Logger", function() {
    describe("#stringify", function() {
        it("should stringify functions", function() {
            var obj = {x: 1, y: "foo", z: function () {}};
            var expected = '{"x":1,"y":"foo","z":"function () {}"}';
            assert.equal(log.stringify(obj), expected);
        });
        it("should stringify numbers, strings, booleans", function() {
            var obj = {x: 1, y: "foo", z: true};
            var expected = '{"x":1,"y":"foo","z":true}';
            assert.equal(log.stringify(obj), expected);
        });
        it("should stringify arrays", function() {
            var obj = {x: [1,2,"foo",true]};
            var expected = '{"x":[1,2,"foo",true]}';
            assert.equal(log.stringify(obj), expected);
        });
    });
});
