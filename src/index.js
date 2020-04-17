const fs = require('fs');
const path = require('path');
let levels = {
    notset: 0,
    debug: 1,
    info: 2,
    warning: 3,
    error: 4,
    critical: 5
};
class Logging {
    /**
     * The constructor for the logger
     * @constructor
     * @param {object} [options] - An object containing each option
     * @param {string} [options.level] - The level of the logger itself
     * @param {string} [options.format] - Your own custom formatter
     * @param {string} [options.filename] - The name of the file
     * @param {string} [options.filemode] - The selected filemode
     * @param {string} [options.name] - Sets a name for the logger
     */
    constructor(options) {
        this.set_level = options.level || 'NOTSET';
        this.levelParser(this.set_level);
        this.format = options.format || '[#{date}|#{time}]:#{name}:#{levelname}: #{message}';
        this.filename = options.filename;
        this.filemode = options.filemode;
        this.logger_name = options.name || 'root';
        this.mode = options.filename ? this.mode = 'write' : this.mode = 'print';
    }
    /**
     * Gets the current formatter
     * @returns {string} The current formatter
     */
    get formatter() {
        return this.format;
    }
    /**
     * Returns the current level integer
     * @returns {number} The level integer
     */
    get levelInteger() {
        return this.parsed_level;
    }
    /**
     * Gets the current log level
     * @returns {string} The current level
     */
    get levelString() {
        return this.set_level;
    }
    /**
     * Gets the current log mode
     * @returns {string} The current logging mode
     */
    get logMode() {
        return this.mode;
    }
    /**
     * Sets a new name for the current logger
     * @param {String} name - A string containing the new name for this logger
     * @returns {void}
     */
    setName(name) {
        this.logger_name = name;
    }
    /**
     * Sets the current level
     * @param {string} level The level you want to set (Read the [documentation](https://github.com/zSnails/BetterLogging.js#log-levels) for more info)
     * @returns {void}
     */
    setLevel(level) {
        this.set_level = level;
        this.levelParser(level);
    }
    /**
     * Sets a new formatter
     * @param {string} fmt The new formatter (Read the [documentation](https://github.com/zSnails/BetterLogging.js#formatting) for more info)
     * @returns {void}
     */
    setFormatter(fmt) {
        this.format = fmt;
    }
    /**
     * Gets the name of the current log file
     * @returns {string} The name of the file or 'none' if there's no file
     */
    get logFile() {
        if (this.filename) return this.filename + ".log";
        else return 'none'
    }
    /**
     * Sets a new file name
     * @param {string} file The path to the new logging file, a new file is created each time the function is called with a new path
     * @returns {string}
     */
    setFile(file) {
        this.filename = file;
        this.getPath;
        return this.filename
    }
    /**
     * Reads a log file and prints it to the console
     * @param {string} file The path to the file you want to re-log
     * @returns {void}
     */
    reLog(file) {
        console.log(fs.readFileSync(file, 'utf8'));
    }
    /**
     * Gets the current path, returns 'none' if there's no path
     * @returns {string} Wether or not there's a file path
     */
    get getPath() {
        if (this.filepath) return this.filepath = path.join(process.cwd(), `${this.filename}.log`);
        else return 'none';
    }
    /**
     * Creates a debug log
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     * @returns {void}
     */
    debug(...args) {
        // DEBUG: First level of information
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 1) return;
        this.level = 'DEBUG';
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
    * Creates an info log
    * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
    * @returns {void}
    */
    info(...args) {
        // INFO: Second level of information
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 2) return;
        this.level = 'INFO';
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
    * Creates a warning log
    * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
    * @returns {void}
    */
    warning(...args) {
        // WARNING: 3rd level of information
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 3) return;
        this.level = 'WARNING';
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
     * Creates an error log
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     * @returns {void}
     */
    error(...args) {
        // ERROR: 4th level of information
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 4) return;
        this.level = 'ERROR';
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
     * Creates a critical log
     * @param  {...any} args The arguments to pass through the method, multiple arguments can be passed
     * @returns {void}
     */
    critical(...args) {
        // CRITICAL: Last level of information
        args = args.join().replace(/\,/g, " ");
        if (this.parsed_level > 5) return;
        this.level = 'CRITICAL';
        this.mode === 'print' ? this.log(this.format, args) : this.write(this.format, args);
    }
    /**
     * Turns level strings into integers
     * @param  {string} level_str You don't need to use this function yourself
     * @returns {void}
     */
    levelParser(level_str) {
        this.parsed_level = levels[level_str.toLowerCase()]
    }
    /**
     * Creates a log and parses it
     * @param {string} format The formatter used
     * @param {string} message The log message
     * @returns {void}
     */
    log(format, message) {
        console.log(this.formatParser(format, message));
    }
    /**
     * Creates a log and writes it to a file
     * @param {string} format The formatter used
     * @param {string} message The log message
     */
    write(format, message) {
        fs.writeFileSync(this.getPath, this.formatParser(format, message) + '\n', { flag: this.filemode });
    }
    /**
     * Turns the given format into a human readable string
     * @param {string} format The formatter used
     * @param {string} message The log message
     * @returns {void}
     */
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