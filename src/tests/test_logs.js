const Logger = require('../index');
const logger = new Logger('debug', '#{time} | #{levelname} > #{message}', 'output', 'a');

console.log(logger.getPath);

logger.reLog(logger.getPath);
