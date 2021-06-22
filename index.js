import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
 
const app = express();
const PORT = process.env.PORT || 3000; 

var photos = [];
scrapeInstagram();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', (req, res) => {
  return res.json(photos);
});

async function scrapeInstagram() {
    const html = await axios.get('https://picuki.com/tag/cuoredinapoli');
    const $ = await cheerio.load(html.data);
    photos = []
    $('.photo').each((i, elem) => {
        let immagine = $(elem).find('img.post-image').attr('src').substring(25);
        photos.push(decodeURIComponent(decodeURI(immagine).replace(new RegExp(/\|\|/, "g"), '\/').replace("%3A", ":")));
    })
}

setInterval(() => {
    scrapeInstagram();
}, 300000);

app.listen(PORT, () =>
  console.log(`app listening on port ${PORT}!`),
);