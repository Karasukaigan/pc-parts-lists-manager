const express = require('express');
const path = require('path');
const fs = require('fs');

const jsonRouter = express.Router();

jsonRouter.delete('/', (req, res) => {
    const selectedConfig = req.query.filename;

    if (!selectedConfig) {
        res.status(400).send('Bad Request');
        return;
    }

    const jsonFilePath = path.join(__dirname, '..', 'public', 'json', `${selectedConfig}.json`);

    fs.unlink(jsonFilePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).send('Configuration deleted successfully');
    });
});

module.exports = jsonRouter;