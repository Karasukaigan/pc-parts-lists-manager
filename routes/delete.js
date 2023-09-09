const express = require('express');
const path = require('path');
const fs = require('fs');

const jsonRouter = express.Router();

jsonRouter.delete('/', (req, res) => {
    const selectedListName = req.query.filename;

    if (!selectedListName) {
        res.status(400).send('Empty file name');
        return;
    }

    const jsonFilePath = path.join(__dirname, '..', 'public', 'json', `${selectedListName}.json`);

    fs.unlink(jsonFilePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).send('List deleted successfully');
    });
});

module.exports = jsonRouter;