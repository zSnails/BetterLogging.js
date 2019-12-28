const fs = require('fs');
const path = require('path');

class Logging {
    constructor() {
        // Nothing here /shrug
    }

    basicConfig(level, format, filename, filemode) {
        // Basi config lets us configure our logger
        if (!level) this.set_level = 'NOTSET'
        else this.set_level = level;
        this.levelParser(this.set_level);
        this.format = format;
        this.filename = filename;
        this.filemode = filemode;
        this.mode;
        if (filename) {
            this.filepath = path.join(process.cwd(), `${this.filename}.log`);
            this.mode = 'write';
        } else {
            this.mode = 'print';
        }

    }

    debug(...args) {
        // DEBUG: First level of information
        if (this.parsed_level > 1) return;
        this.level = 'DEBUG';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }

    info(...args) {
        // INFO: Second level of information
        if (this.parsed_level > 2) return;
        this.level = 'INFO';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }

    warning(...args) {
        // WARNING: 3rd level of information
        if (this.parsed_level > 3) return;
        this.level = 'WARNING';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }

    error(...args) {
        // ERROR: 4th level of information
        if (this.parsed_level > 4) return;
        this.level = 'ERROR';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }

    critical(...args) {
        // CRITICAL: Last level of information
        if (this.parsed_level > 5) return;
        this.level = 'CRITICAL';
        if (this.mode === 'print') {
            this.log(this.format, args);
        } else {
            this.write(this.format, args);
        }
    }
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
            .replace(/\#\{message\}/g, message))
            .replace(/\#{time}/g, new Date().toLocaleTimeString());
    }

    write(format, message) {
        let tempf = `${format}`
            .replace(/\#\{date\}/g, new Date().toLocaleDateString())
            .replace(/\#\{filename\}/g, __filename)
            .replace(/\#\{levelname\}/g, this.level)
            .replace(/\#\{message\}/g, message)
            .replace(/\#{time}/g, new Date().toLocaleTimeString());
        fs.writeFileSync(this.filepath, tempf + '\n', { flag: this.filemode });
    }

}

module.exports = Logging;