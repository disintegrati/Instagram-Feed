const axios = require('axios');
const Insta = require('scraper-instagram');
const InstaClient = new Insta();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (req, res) => {
return res.json(array);
});

let array = [];
InstaClient.authBySessionId('48313143705%3AkKnk1CbSPVMKrw%3A11')
	//.then(account => console.log(account))
  .catch(err => console.error(err));
  
setInterval(() => {
  InstaClient.getHashtag('cuoredinapoli')
	.then(async hashtag => {
    array=[];
    for (let index = 0; index < hashtag.lastPosts.length; index++) {
      const element = hashtag.lastPosts[index].thumbnail;
      let image = await axios.get(element, {responseType: 'arraybuffer'});
      let returnedB64 = Buffer.from(image.data).toString('base64');
      array.push(returnedB64);
    }
  })
	.catch(err => console.error(err));
}, 600000);

app.listen(PORT, () =>
  console.log(`app listening on port ${PORT}!`),
);
