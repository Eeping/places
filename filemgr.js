const {MongoClient} = require('mongodb'); //referencing {},
const fs = MongoClient; //assign to fs

const database = 'mongodb://localhost:27017'; //test locally
// const database = 'mongodb://lab123:lab123@ds051893.mlab.com:51893/weatherapp'; //in cloud

const appname = 'placesapp';
const collectionname = 'placesappcollection';

const saveData = (newdata) => {
  //define function
  //create promise
  return new Promise((resolve, reject) => {
    //connect to mongo server
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject ('unable to connect to MongoDB'); //promise - reject, anytime error, reject
      }

      console.log('connected to MongoDB');
      //function to create database
      const db = client.db(appname);

      const length = newdata.length;
      for(var i = 0; i < length; i++) {
        db.collection(collectionname).insertOne(newdata[i], (err, result) => {
          if (err){
            reject ('unable to insert');
          }

        });
      }
      resolve (1); //promise only return one value, promises -> reject, resolve

      client.close();
    });
  });
};

//display data
const getAllData = () => {
  return new Promise((resolve, reject) => {
    //connect to mongo server
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('unable to connect to MongoDB');
      }

      console.log('connected to MongoDB');
      //function to create database
      const db = client.db(appname);

    //then() - promise
    db.collection(collectionname).find().toArray().then( (docs) => {
      resolve(docs); //converty JSON to string - JSON.stringify(docs)
    }, (err) => {
        reject('Unable to fetch docs');
    });

      client.close();
    });
  });
};

//delete data
const deleteAll = () => {
  return new Promise((resolve, reject) => {
    //connect to mongo server
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('unable to connect to MongoDB');
      }

      console.log('connected to MongoDB');
      //function to create database
      const db = client.db(appname);

    //then() - promise
    db.collection(collectionname).remove({}).then( (result) => {
      resolve(result); //convert JSON to string - JSON.stringify(docs)
    }, (err) => {
        reject('Unable to delete');
    });

      client.close();
    });
  });
};


//export function
module.exports = {
  saveData,
  getAllData,
  deleteAll,
}
