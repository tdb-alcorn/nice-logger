function Logger(name, defaultLevel, debug) {
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
            if (args[i] instanceof Error) {
                argStrings.push(args[i].toString());
                stack.push(args[i].stack);
                isError = true;
                continue;
            }
            try {
                switch (args[i].constructor) {
                case String:
                    argStrings.push(args[i]);
                    break
                default:
                    argStrings.push(stringify(args[i]));
                    break
                }
            } catch (error) {
                if (debug) {
                    err(error);
                }
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

    function stringify(obj) {
        function _stringify(obj) {
            var result;
            var v;
            var strung;
            if (obj instanceof Function) {
                result = obj.toString();
            } else if (obj instanceof Object && !Array.isArray(obj)) {
                result = new Object();
                for (var i=0, keys=Object.keys(obj), len=keys.length; i<len; i++) {
                    result[keys[i]] = _stringify(obj[keys[i]]);
                }
            } else {
                result = obj;
            }
            return result;
        }
        return JSON.stringify(_stringify(obj));
    }

    this.setLevel = setLevel;
    this.stringify = stringify;
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
