var Logger = require("../logger.js");

var log = new Logger("test", "debug");

function logAll() {
    var m = "A message.";
    log.debug(m);
    log.info(m);
    log.warning(m);
    log.error(m);
    log.critical(m);
}

logAll();

var err = new Error("This is a test error. Here is the stack trace:");
log.error(err);


log.setLevel("error");
logAll();
