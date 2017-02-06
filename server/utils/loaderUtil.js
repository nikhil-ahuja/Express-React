'use strict';

const fs = require('fs');

exports.isModule = (file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
};

exports.loadModuleDirectory = (dirName) => {
    const modules = {};

    fs.readdirSync(dirName)
        .filter((file) => exports.isModule(file))
        .forEach((file) => {
            const moduleName = file.slice(0, -3);
            modules[moduleName] = require(`${dirName}/${file}`);
        });

    return modules;
};