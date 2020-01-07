# BetterLogging.js

[Full Documentation](https://zsnails.github.io/BetterLogging.js/)


## Available File Modes
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

## Formatting

This is a list of every formatting option, there is no default format, so you must provide one.

|Name|Description|
|:-:|:-|
|#{date}| The current date `Example: 2019-12-28` (The formatting of this depends on your computer)
|#{filename}| The path of the file where the log originated
|#{levelname}| The current level
|#{message}| The log message
|#{time}| The current time `Example: 12:23:50` (The formatting of this depends on your computer)
|#{name}| The name of the current logger