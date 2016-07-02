'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = (options) => {

    options = {
        path:       options.path        || 'logs',
        file:       options.file        || 'log.txt',
        dateFormat: options.dateFormat  || 'YYYY/M/D H:m:s'
    };

    // create folder
    if(!fs.existsSync(options.path)) {
        fs.mkdirSync(options.path, '0755');
    }

    return (req, res, next) => {

        // get currente date
        let date = moment().format('D-M-YYYY');
        
        // build the path to the new file
        let extension = path.extname(options.file);
        let basename = path.basename(options.file, extension);
        
        let new_path = path.join(options.path, basename + '-' + date + extension);
        
        // build the message
        let message = `${req.method} ${req.path} ${moment().format(options.dateFormat)} ${req.ip} \n`;

        // write log in to the file
        let stream = fs.createWriteStream(new_path, { flags: 'a' });

        stream.end(message);

        stream.on('finish', () => {
            next();
        });
    };
};