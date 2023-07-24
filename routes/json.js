const express = require('express');
const path = require('path');
const fs = require('fs');

const jsonRouter = express.Router();
const jsonDirPath = path.resolve(__dirname, '..', 'public', 'json');

jsonRouter.get('/', (req, res) => {
    fs.readdir(jsonDirPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const jsonFiles = files
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace('.json', ''));

        res.json(jsonFiles);
    });
});

module.exports = jsonRouter;
