//const bootstrap = require('bootstrap');
//require('bootstrap/dist/css/bootstrap.css');

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const path = require('path');
const chart = require('chart.js');

const app = express();

// const logger = function(req, res, next){
//     console.log('Logging...');
//     next();
// };
//
//app.use(logger);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, { index: 'index.htm' }));

app.get('/', function(req, res){
    res.render('index', {
        title: "We Won't",
        artist: 'James Young',
        album: 'Feel Something',
        year: '2017'
    });
});

app.post('/input', function(req, res) {
    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }
    if(req.files.mp3File){
        let mp3File = req.files.mp3File;
        var mp3path = __dirname + '/CNN/Input/Raw/new.mp3'
        const moveMP3 = async () => {
            await mp3File.mv(mp3path, function(err) {
                if (err){
                    return res.status(500).send(err);
                }
            });
            await mm.parseFile(mp3path, {native: true})
                .then(function (metadata) {
                    //console.log(util.inspect(metadata, { showHidden: false, depth: null }));
                    console.log('made it here!');
                    console.log(metadata.common.title);
                    console.log(metadata.common.artist);
                    console.log(metadata.common.album);
                    console.log(metadata.common.year);
                })
                .catch(function (err) {
                    console.error(err.message);
            });
        };
        moveMP3();

        //getMM(__dirname + '/CNN/Input/Raw/new.mp3');
        // res.render('index', {
        //     title: mp3MM.title,
        //     artist: mp3MM.artist,
        //     album: mp3MM.album,
        //     year: mp3MM.year
        // });
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
    var newBPM = getBPM(__dirname + '/CNN/Input/Raw/new.mp3')
    res.send('BPM is ' + newBPM);
});
//app.get('/cnnResults', callCNN);

app.listen(8000, function () {
    console.log('Server running on port 8000...');
})

// modularize this

// callCNN
const PythonShell = require('python-shell');

callCNN = function(req, res) {
  var options = {
    args: ['sliceInput', 'predict'],
    scriptPath: './CNN'
  }

  PythonShell.run('./main.py', 'predict', function (err, data) {
    if (err) res.send(err);
    res.send(data.toString())
    console.log('Dance style scores: ' + data.toString())
  });
};

// getBPM
const bpmSink = require('bpm.js')
const spawn = require('child_process').spawn

const createAudioStream = function(filename) {
    var args = "-t raw -r 44100 -e float -c 1 -".split(" ")
    args.unshift(filename)
    var sox = spawn("sox", args)
    return sox.stdout;
};

const getBPM = function(mp3){
    createAudioStream(mp3)
    .pipe(bpmSink())
    .on("bpm", function(bpm){
      console.log("bpm is %d", bpm)
      return bpm;
    });
};

// mp3FromSpotify
// const downloader = require('spotify-mp3-playlist-downloader');
// const mp3FromSpotify = function(spotifyURI){
//     downloader.downloadPlaylist(spotifyURI, "./CNN/Input/Raw", function (err){
//         if (err){
//           console.log("download failed");
//         }else{
//           console.log("playlist download succeeded");
//         }
//     })
// };


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

// tapBPM
const BPM = require('bpm');

const tapBPM = function(){

    b = new BPM();
    b.tap();
    setTimeout(function() {
      console.log(b.tap());
    }, 1000);

    // update gauge
};

// getMeta
const mm = require('music-metadata');
const util = require('util')

const getMM = function(mp3path){
    mm.parseFile(mp3path, {native: true})
    .then(function (metadata) {
        // return util.inspect(metadata, { showHidden: false, depth: null })
        console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    })
    .catch(function (err) {
        console.error(err.message);
    });
};

// chart updates!
// Ask about managing post and get from different input sources. And how to avoid redirecting to a new URL
// async await, .then or what to manage app.post processes.

