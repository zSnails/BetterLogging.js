const fs = require('fs');
const path = require('path');

class Logging {
    /**
     * The constructor for the logger
     * @constructor
     * @param {object} options - An object containing each option
     * @param {string} [options.level] - The level of the logger itself
     * @param {string} options.format - Your own custom formatter
     * @param {string} [options.filename] - The name of the file
     * @param {string} [options.filemode] - The selected filemode
     * @param {string} [options.name] - Sets a name for the logger
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
    /**
     * @method
     * @returns {string} The current formatter
     */
    get getFormatter() {
        return this.format;
    }
    /**
     * @method
     * @returns {number} The level integer
     */
    get getLevelInteger() {
        return this.parsed_level;
    }
    /**
     * @method
     * @returns {string} The current level
     */
    get getLevelString() {
        return this.set_level;
    }
    /**
     * @method
     * @returns {string} The current logging mode
     */
    get getLogMode() {
        return this.mode;
    }
    /**
     * Sets a new name for the current logger
     * @method
     * @param {String} name - A string containing the new name for this logger
     */
    setName(name) {
        this.logger_name = name;
    }

    /**
     * Sets the current level
     * @method
     * @param {string} level The level you want to set (Read the [documentation](https://github.com/zSnails/BetterLogging.js#log-levels) for more info)
     * @returns {string}
     */
    setLevel(level) {
        this.set_level = level;
        this.levelParser(level);
        return 'success'
    }
    /**
     * Sets a new formatter
     * @method
     * @param {string} fmt The new formatter (Read the [documentation](https://github.com/zSnails/BetterLogging.js#formatting) for more info)
     * @returns {string}
     */
    setFormatter(fmt) {
        this.format = fmt;
        return 'sucess'
    }
    /**
     * @method
     * @returns {string}
     */
    get getFile() {
        return this.filename + ".log";
    }
    /**
     * Sets a new file name
     * @method
     * @param {string} file The path to the new logging file, a new file is created each time the function is called with a new path (Read the [documentation](https://github.com/zSnails/BetterLogging.js#setfile) for more info)
     * @returns {string}
     */
    setFile(file) {
        this.filename = file;
        this.getPath;
        return 'success'
    }
    /**
     * Reads a log file and prints it to the console
     * @method
     * @param {string} file The path to the file you want to re-log (Read the [documentation](https://github.com/zSnails/BetterLogging.js#relog) for more info)
     */
    reLog(file) {
        console.log(fs.readFileSync(file, 'utf8'));
    }
    /**
     * @method
     * @returns {string}
     */
    get getPath() {
        return this.filepath = path.join(process.cwd(), `${this.filename}.log`);
    }
    /**
     * Creates a debug log
     * @method
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     * @returns {void}
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
    * Creates an info log
    * @method
    * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
    * @returns {void}
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
    * Creates a warning log
    * @method
    * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
    * @returns {void}
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
            case ('NOTSET'):
                this.parsed_level = 0;
                break;
            case ('DEBUG'):
                this.parsed_level = 1;
                break;
            case ('INFO'):
                this.parsed_level = 2;
                break;
            case ('WARNING'):
                this.parsed_level = 3;
                break;
            case ('ERROR'):
                this.parsed_level = 4
                break;
            case ('CRITICAL'):
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