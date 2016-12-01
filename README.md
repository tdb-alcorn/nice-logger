# nice-logger

A logger with levels and a nice format.

## Example

```javascript
var Logger = require("nice-logger");

var log = new Logger("main", "error");

try {
    log.debug("Uh oh.");
    /* Something dangerous. */
} catch (error) {
    log.error(error);  // Stack trace is automatically logged for Error objects.
}
```

## Usage

Use it like `log.<level>(arg1, arg2, ...)`. You can pass in as many arguments as you'd like.
Anything that is not an `Error` or a `String` will be JSON stringified.

The logger normally writes to `process.stdout`. If any of the arguments is an `Error` object, the
logger will write the whole message to `stderr` instead of `stdout` (so call `error.toString()`
first if you'd like the logger to write to `stdout`.

## Levels

The five allowed levels are, in descending order of priority:

1. critical
2. error
3. warning
4. info
5. debug

You can (optionally) pass in a level as the second argument of the `Logger` constructor. This will
set the default level. If you pass in something unrecognized, or don't pass in anything at all, the
default level is set lower than debug. In other words, everything will get logged by default.

## Methods

Logging methods:

- `#critical(...)`: Log a message at the critical level.
- `#error(...)`: Log a message at the critical level.
- `#warning(...)`: Log a message at the warning level.
- `#info(...)`: Log a message at the info level.
- `#debug(...)`: Log a message at the debug level.

Other methods:

- `#out(String)`: Write to `process.stdout`.
- `#err(String)`: Write to `process.stderr`.
- `#setLevel(level)`: Change the logger level.
