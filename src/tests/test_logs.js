const Logger = require('../index');
const options = {
    name: 'tests',
    //filename: 'output',
    //filemode: 'a',
    level: process.argv[2] || 'debug',
    format: '#{time} |#{name}| #{levelname} > #{message}',
}

const logger = new Logger(options);

logger.info('picha', 'marrai');
logger.setName('NEWNAME');
logger.info('picha', 'marrai');
logger.debug('Testing', 'some', 'stuff');
logger.warning('warning');
logger.error('err');
logger.critical('can\'t work as intended');
console.log(logger.levelInteger)