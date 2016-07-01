# Express REST logger

A lightweight Express middleware for intercepting REST calls and log them into a file.

### Version
0.0.1

### Installation

```sh
$ npm install --save express-rest-logger
```

### Usage

```sh
const express = require('express');
const logger = require('express-rest-logger');

const app = express();

app.use(logger({
    path: 'logs-folder',
    filename: 'log-filename'
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
