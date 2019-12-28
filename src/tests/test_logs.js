const Logger = require('../index');
const logger = new Logger('debug', '#{time} | #{levelname} > #{message}');


console.log(logger.getLevelInteger, logger.getLevelString);


logger.debug('ewrror', 'lol');
logger.info('ewrror', 'lol');
logger.warning('ewrror', 'lol');
logger.error('ewrror', 'lol');
logger.critical('ewrror', 'lol');

console.log(parseInt('6'))