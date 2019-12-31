# BetterLogging.js

BetterLogging is a package that tries to mimic python's built-in logging module.

---

# Set Up

To set up BetterLogging.js import the module then use the `basicConfig` method to set up your logger

```js
const Logging = require('betterlogging.js');
const ops =  {
    name: 'example',
    filemode: 'example',
    filename: 'output-example',
    format: '#{levelname} > #{message}',
    level: 'DEBUG',
}
const logger = new Logging(ops);
```
---

# Log Levels
There are 5 different levels, each represented by a string


|String|
|:-:|
|DEBUG|
|INFO|
|WARNING|
|ERROR|
|CRITICAL|

---

# Formatting

This is a list of every formatting option, there is no default format, so you must provide one.

|Name|Description|
|:-:|:-|
|#{date}| The current date `Example: 2019-12-28` (The formatting of this depends on your computer)
|#{filename}| The path of the file where the log originated
|#{levelname}| The current level
|#{message}| The log message
|#{time}| The current time `Example: 12:23:50` (The formatting of this depends on your computer)

---

# Filename
If you donn't provide a filename then every log will go to the console, as long as there's no `filename` no `filemode` is necessary. The file name must not contain any extension, just the name, a `.log` extension will be automatically added.

---

# Logger objects

## setLevel(*level*)
This method changes the current level.
Logging messages which are less severe than *level* will be ignored
When your logger instance is created the default level is always `NOTSET` which is an integer `0`.
Logging messages with higher severity level will be logged unlike lower severity logging messages

## setFormatter(*fmt*)
This method changes the design of the current formatter, a new formatter can be passed through

## getFormatter
This method returns the current formatter that's being used.

## getPath
This method returns the current path of the log file, if there's no log file it will return undefined

## setFile()
This method modifies the current file name (WARNING: it doesn't change the existing file, it creates a new file each time the method is called)

### Available file modes
|Name|Description|
|:-:|:-|
|'a'|Open file for appending. The file is created if it does not exist.|
|'ax'| Like 'a' but fails if the path exists.|
|'a+'| Open file for reading and appending. The file is created if it does not exist.|
|'ax+'| Like 'a+' but fails if the path exists.|
|'as'|Open file for appending in synchronous mode. The file is created if it does not exist.|
|'as+'| Open file for reading and appending in synchronous mode. The file is created if it does not exist.|
|'r'| Open file for reading. An exception occurs if the file does not exist.|
|'r+'| Open file for reading and writing. An exception occurs if the file does not exist.|
|'rs+'| Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.|
|'w'| Open file for writing. The file is created (if it does not exist) or truncated (if it exists).|
|'wx'| Like 'w' but fails if the path exists.|
|'w+'| Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).|
|'wx+'| Like 'w+' but fails if the path exists.|


## reLog(*file*)
This method re-logs everything from a file 
> This method may be deprecated in the future

## setName(*name*)
This method allows you to change the name of your current logger. Helpful if need to know in which scope a log was created

## getLogMode
This method returns the current mode for the file (defaults to 'w' (write mode))

## debug(*message*)
This method creates a debug log

## info(*message*)
This method creates an info log

## warning(*message*)
This method creates a warning log

## error(*message*)
This method creates an error log

## critical(*message*)
This method creates a critical log

---



# Output
The file will be created on the current working directory, to change this just add a folder before the name of your file, followed by a `/`
```js
logger.basicConfig("DEBUG", '#{message}', 'logs/output');
```