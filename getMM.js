const mm = require('music-metadata');
const util = require('util')

filePath = '/Users/jonathanleape/Documents/1.001/Project/Data/Bachata/BACHATA 2017 ► BACHATA MIX 2017 ► GRUPO EXTRA, ROMEO SANTOS, PRINCE ROYCE, SHAKIRA ► BACHATA HITS (192  kbps).mp3'
mm.parseFile(filePath, {native: true})
    .then(function (metadata) {
        console.log(util.inspect(metadata.common.genre, { showHidden: false, depth: null }));
    })
    .catch(function (err) {
        console.error(err.message);
    });