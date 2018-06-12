const axios = require('axios');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const server =  express(); //export function from express

const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({extended: true}));//check body form
server.set('view engine', 'hbs'); //set server to use hbs as views engine
hbs.registerPartials(__dirname + '/views/partials') //tell hbs that you use partials

const PLACES_API_KEY = 'AIzaSyDDzo12RmOPO1X08qGD2P62TkxWxvqHdYc';

//path to root directory
server.get('/', (req, res) => {
  res.render('home.hbs');
});

server.get('/form', (req, res) => {
  res.render('form.hbs');
});

server.post('/getplaces', (req, res) => {
  const addr = req.body.address; //extract content of address from txtbox
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyBo54sDKP0LPhJBhmX7FsUPBRZYsC4YczI`;

  axios.get(locationReq).then((response) => {
    //javascript object, key -> value
    const locationData = {
      addr: response.data.results[0].formatted_address,
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    }

    const placesReq=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=1500&types=food&name=food&key=${PLACES_API_KEY}`;
    return axios.get(placesReq);
  }).then((response) =>{
    res.status(200).send(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
