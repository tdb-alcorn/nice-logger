var Logger = require("../logger.js");

var log = new Logger("test");

var m = "a message";
log.debug(m);
log.info(m);
log.warning(m);
log.error(m);
log.critical(m);
