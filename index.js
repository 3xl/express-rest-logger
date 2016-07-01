'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');

module.exports = (options) => {

    options = options || {};

    return (req, res, next) => {
        // validate the 'path' option. If it's not set or the folder doesn't exist skip the log funcionality 
        if(util.isUndefined(options.path)) {
            next();
        }

        // check folder
        if(!fs.existsSync(options.path)) {
            fs.mkdirSync(options.path, '0755');
        }

        // normalize the filename
        let file = util.isUndefined(options.file) ? 'log.txt' : options.file;

        // get currente date
        let date = moment().format('D-M-YYYY');
        
        // build the path to the new file
        let extension = path.extname(file);
        let basename = path.basename(file, extension);
        
        let new_path = path.join(options.path, basename + '-' + date + extension);
        
        // build the message
        let message = `${req.method} ${req.path} ${moment().format('YYYY/M/D H:m:s')} ${req.ip} \n`;

        // write log in to the file
        let stream = fs.createWriteStream(new_path, { flags: 'a' });

        stream.end(message);

        stream.on('finish', () => {
            next();
        });
    };
};