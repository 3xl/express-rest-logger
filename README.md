# Express REST logger

A lightweight Express middleware for intercepting REST calls and log them into a file.

### Version
0.0.3

### Installation

```sh
$ npm install --save express-rest-logger
```

### Config

Key | Default | Description
---|---|---
path | ./logs | The folder used to store the log files.
file | log.txt | The name of the file.
dateFormat | YYYY/M/D H:m:s | The format of the date of each REST call stored in the log file. Follow the Moment.js **[documentation](http://momentjs.com/docs/#/displaying/format/)** to customize it.

### Usage

```sh
const express = require('express');
const logger = require('express-rest-logger');

const app = express();

app.use(logger({
    path: 'logs-folder',
    file: 'log-filename',
    dateFormat: 'YYYY/M/D'
}));

app.get('/', (req, res) => {
   res.json({
       data: 'test data'
   });
});

app.listen('3000', () => {
    console.log('Application started');
});
```

License
----

MIT
