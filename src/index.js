const fs = require('fs');
const path = require('path');

class Logging {
    constructor(level, format, filename, filemode) {
        level = level.toUpperCase();
        if (!level) this.set_level = 'NOTSET'
        else this.set_level = level;
        this.levelParser(this.set_level);
        this.format = format;
        this.filename = filename;
        this.filemode = filemode;
        this.mode;
        if (filename) {

            this.mode = 'write';
        } else {
            this.mode = 'print';
        }
    }

    get getFormatter() {
        return this.format;
    }

    get getLevelInteger() {
        return this.parsed_level;
    }

    get getLevelString() {
        return this.set_level;
    }

    get getLogMode() {
        return this.mode;
    }
    /**
     * 
     * @param {String} level The level you want to set (Read the [documentation](https://github.com/zSnails/BetterLogging.js#log-levels) for more info)
     */
    setLevel(level) {
        this.set_level = level;
        this.levelParser(level);
        return 'success'
    }
    /**
     * 
     * @param {String} fmt The new formatter (Read the [documentation](https://github.com/zSnails/BetterLogging.js#formatting) for more info)
     */
    setFormatter(fmt) {
        this.format = fmt;
        return 'sucess'
    }

    get getFile() {
        return this.filename + ".log";
    }
    /**
     * 
     * @param {String} file The path to the new logging file, a new file is created each time the function is called with a new path (Read the [documentation](https://github.com/zSnails/BetterLogging.js#setfile) for more info)
     */
    setFile(file) {
        this.filename = file;
        this.getPath;
        return 'success'
    }
    /**
     * 
     * @param {String} file The path to the file you want to re-log (Read the [documentation](https://github.com/zSnails/BetterLogging.js#relog) for more info)
     */
    reLog(file) {
        console.log(fs.readFileSync(file, 'utf8'));
    }

    get getPath() {
        this.filepath = path.join(process.cwd(), `${this.filename}.log`);
        return this.filepath;
    }
    /**
     * 
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     */
    debug(...args) {
        // DEBUG: First level of information
        args = Array.from(arguments);
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 1) return;
        this.level = 'DEBUG';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
    /**
 * 
 * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
 */
    info(...args) {
        // INFO: Second level of information
        args = Array.from(arguments);
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 2) return;
        this.level = 'INFO';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
    /**
 * 
 * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
 */
    warning(...args) {
        // WARNING: 3rd level of information
        args = Array.from(arguments);
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 3) return;
        this.level = 'WARNING';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
    /**
     * 
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     */
    error(...args) {
        // ERROR: 4th level of information
        args = Array.from(arguments);
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 4) return;
        this.level = 'ERROR';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
    /**
     * 
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     */
    critical(...args) {
        // CRITICAL: Last level of information
        args = Array.from(arguments);
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 5) return;
        this.level = 'CRITICAL';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
    /**
     * 
     * @param  {String} level_str You don't need to use this function yourself
     */
    levelParser(level_str) {
        // Parses each level into an integer
        if (level_str === 'NOTSET') {
            this.parsed_level = 0;
        } else if (level_str === 'DEBUG') {
            this.parsed_level = 1;
        } else if (level_str === 'INFO') {
            this.parsed_level = 2;
        } else if (level_str === 'WARNING') {
            this.parsed_level = 3;
        } else if (level_str === 'ERROR') {
            this.parsed_level = 4;
        } else if (level_str === 'CRITICAL') {
            this.parsed_level = 5
        }
    }

    log(format, message) {
        console.log(`${format}`
            .replace(/\#\{date\}/g, new Date().toLocaleDateString())
            .replace(/\#\{filename\}/g, __filename)
            .replace(/\#\{levelname\}/g, this.level)
            .replace(/\#\{message\}/g, message)
            .replace(/\#{time}/g, new Date().toLocaleTimeString()));
    }

    write(format, message) {
        let tempf = `${format}`
            .replace(/\#\{date\}/g, new Date().toLocaleDateString())
            .replace(/\#\{filename\}/g, __filename)
            .replace(/\#\{levelname\}/g, this.level)
            .replace(/\#\{message\}/g, message)
            .replace(/\#{time}/g, new Date().toLocaleTimeString());
        fs.writeFileSync(this.getPath, tempf + '\n', { flag: this.filemode });
    }

}

module.exports = Logging;