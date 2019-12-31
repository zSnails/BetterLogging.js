const fs = require('fs');
const path = require('path');

class Logging {
    /**
     * 
     * @param {Object} options An object containing each option
     */
    constructor(options) {
        this.set_level = options.level || 'NOTSET'
        this.levelParser(this.set_level);
        this.format = options.format || '[#{date}|#{time}]:#{name}:#{levelname}: #{message}'
        this.filename = options.filename;
        this.filemode = options.filemode;
        this.logger_name = options.name || 'root';
        this.mode = options.filename ? this.mode = 'write' : this.mode = 'print';
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
     * @param {String} name A string containing the new name for this logger
     */
    setName(name) {
        this.logger_name = name;
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
        return this.filepath = path.join(process.cwd(), `${this.filename}.log`);
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
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
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
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
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
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
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
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
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
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
     * 
     * @param  {String} level_str You don't need to use this function yourself
     */
    levelParser(level_str) {
        // Parses each level into an integer
        switch (level_str) {
            case('NOTSET'):
                this.parsed_level = 0;
                break;
            case('DEBUG'):
                this.parsed_level = 1;
                break;
            case('INFO'):
                this.parsed_level = 2;
                break;
            case('WARNING'):
                this.parsed_level = 3;
                break;
            case('ERROR'):
                this.parsed_level = 4
                break;
            case('CRITICAL'):
                this.parsed_level = 5
                break;
        }
    }

    log(format, message) {
        console.log(this.formatParser(format, message));
    }

    write(format, message) {
        fs.writeFileSync(this.getPath, this.formatParser(format, message) + '\n', { flag: this.filemode });
    }

    formatParser(format, message) {
        format = `${format}`
            .replace(/\#\{date\}/g, new Date().toLocaleDateString())
            .replace(/\#\{filename\}/g, __filename)
            .replace(/\#\{levelname\}/g, this.level)
            .replace(/\#\{message\}/g, message)
            .replace(/\#{time}/g, new Date().toLocaleTimeString())
            .replace(/\#{name}/g, this.logger_name);
        return format
    }
}

module.exports = Logging;