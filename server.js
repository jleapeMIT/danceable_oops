const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

// default options
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname, { index: 'index.htm' }));

app.post('/input', async function(req, res) {
    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }
    if(req.files.mp3File){
        let mp3File = req.files.mp3File;
        mp3File.mv(__dirname + '/input/new.mp3', function(err) {
            if (err){
                return res.status(500).send(err);
            }
        });
    };
    if(req.body.soundCloudURL){
        let soundCloudURL = req.body.soundCloudURL;
        mp3FromSoundCloud(soundCloudURL);
        console.log(soundCloudURL);
    };
    if(req.body.youTubeURL){
        let youTubeURL = req.body.youTubeURL;
        mp3FromYouTube(youTubeURL);
        console.log(youTubeURL);
    };
    var newBPM = getBPM(__dirname + '/input/new.mp3')
    res.send('BPM is ' + newBPM);
});

app.listen(8000)

// modularize this

// getBPM.js
const bpmSink = require('bpm.js')
const spawn = require('child_process').spawn

const getBPM = function(mp3){
    createAudioStream(mp3)
    .pipe(bpmSink())
    .on("bpm", function(bpm){
      console.log("bpm is %d", bpm)
      return bpm;
    });
};

// convert mp3 to proper format
const createAudioStream = function(filename) {
    var args = "-t raw -r 44100 -e float -c 1 -".split(" ")
    args.unshift(filename)
    var sox = spawn("sox", args)
    return sox.stdout;
};

// mp3FromSoundCloud
const SoundRain = require('soundrain');

const mp3FromSoundCloud = function(soundCloudURL){
    var Song = new SoundRain(soundCloudURL, './input');
    Song.on('error', function(err) {
        if(err) throw err;
    }).on('done', function(file) {
        console.log(file);
    });
};

// mp3FromYouTube
const getYouTube = require('youtube-mp3');
 
const mp3FromYouTube = function(youTubeURL){
    getYouTube.download(youTubeURL, '/input', function(err) {
        if(err) return console.log(err);
        console.log('Download completed!');
    });
};

