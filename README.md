# BetterLogging.js

BetterLogging is a package that tries to mimic python's built-in logging module.

# Set Up

To set up BetterLogging.js import the module then use the `basicConfig` method to set up your logger

```js
const Logging = require('betterlogging.js');
const logger = new Logging();

logger.basicConfig(level, format, filename, filemode);
```

# Log Levels
There are 5 different levels, each represented by a string and an integer


|String|Integer|
|:-:|:-:|
|DEBUG|1|
|INFO|2|
|WARNING|3|
|ERROR|4|
|CRITICAL|5|

# Formatting

This is a list of every formatting option, there is no default format, so you must provide one.

|Name|Description|
|:-:|:-|
|#{date}| The current date `Example: 2019-12-28` (The formatting of this depends of your computer)
|#{filename}| The path of the file where the log originated
|#{levelname}| The current level
|#{message}| The log message
|#{time}| The current time `Example: 12:23:50` (The formatting of this depends of your computer)

# Filename
If you donn't provide a filename then every log will go to the console, as long as there's no `filename` no `filemode` is necessary. The file name must not contain any extension, just the name, a `.log` extension will be automatically added.

# Output
The file will be created on the current working directory, to change this just add a folder before the name of your file, followd by a `/`
```js
logger.basicConfig("DEBUG", '#{message}', 'logs/output');
```