import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
 
const app = express();
const PORT = process.env.PORT || 3000; 

var photos = [];
scrapeInstagram();

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