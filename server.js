const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

// default options
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname, { index: 'index.htm' }));

app.post('/upload', function(req, res) {
    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }
    if(req.files.mp3File){
        let mp3File = req.files.mp3File;
        mp3File.mv(__dirname + '/upload/upload.mp3', function(err) {
            if (err){
                return res.status(500).send(err);
            }
            res.send('MP3 file uploaded!');
        });
    };

    if(req.body.soundCloudURL){
        let soundCloudURL = req.body.soundCloudURL;
        console.log(soundCloudURL);
        res.send('SoundCloud URL received!');
    };
});

app.listen(8000)