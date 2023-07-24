const express = require('express');
const path = require('path');
const fs = require('fs');

const newRouter = express.Router();

newRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'new.html'));
});

newRouter.post('/', (req, res) => {
    const fileName = req.body.name;
    const jsonData = req.body.data;

    if (!fileName || !jsonData) {
        res.status(400).send('Bad Request');
        return;
    }

    const jsonDirPath = path.join(__dirname, '..', 'public', 'json');
    const jsonFileName = `${fileName}.json`;

    fs.readdir(jsonDirPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let uniqueFileName = jsonFileName;
        let count = 1;
        while (files.includes(uniqueFileName)) {
            const baseName = path.parse(jsonFileName).name;
            const extName = path.parse(jsonFileName).ext;
            uniqueFileName = `${baseName}(${count})${extName}`;
            count++;
        }

        const jsonFilePath = path.join(jsonDirPath, uniqueFileName);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Configuration saved successfully');
        });
    });
});

module.exports = newRouter;
