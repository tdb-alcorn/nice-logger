function Logger(name, defaultLevel) {
    var levels = {
        debug: 10,
        info: 20,
        warning: 30,
        error: 40,
        critical: 50,
    };
    var levelCodes = {
        debug: "D",
        info: "I",
        warning: "W",
        error: "E",
        critical: "C",
    };
    var level = 0;

    function setLevel(newLevel) {
        level = levels[newLevel] || 0;
    }

    setLevel(defaultLevel);

    function _log(level, args) {
        var ts = (new Date).toISOString();
        var loggerName = "[" + name + "]";
        var sep = ">>";
        var argStrings = [];
        var stack = [];
        var isError = false;
        for (var i=0, len=args.length; i<len; i++) {
            switch (args[i].constructor) {
            case Error:
                argStrings.push(args[i].toString());
                stack.push(args[i].stack);
                isError = true;
                break;
            case String:
                argStrings.push(args[i]);
                break
            default:
                argStrings.push(JSON.stringify(args[i]));
                break
            }
        }
        var toPrint = [levelCodes[level], ts, loggerName, sep, argStrings.join(" ")].join(" ");
        if (isError) {
            err(toPrint);
            err(stack.join("\n"));
            return;
        }
        out(toPrint);
    }

    function out(s) {
        process.stdout.write(s + "\n");
    }

    function err(s) {
        process.stderr.write(s + "\n");
    }

    this.setLevel = setLevel;
    this.out = out;
    this.err = err;
    for (var i=0, keys=Object.keys(levels), len=keys.length; i<len; i++) {
        this[keys[i]] = function(lvl) {
            return function() {
                if (levels[lvl] >= level) {
                    _log(lvl, arguments)
                }
            }
        }(keys[i]);
    }
}

module.exports = Logger;
