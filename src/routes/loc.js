let express = require('express');
let router = express.Router();

const mongoCRUDs = require('../db/mongoCRUDs');

// Wird bei GET http://localhost:8000/loc aufgerufen 
router.get('/', async function(req, res) {
  try {
    let locations = await mongoCRUDs.findAllLocations();
    if(locations)
      res.status(200).json(locations);
    else {
      res.status(404).send("Locations not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something is not right!!");
  }
});

/* 
  POST http://localhost:8000/loc mit payload 
  {"name": ..., "description": ..., "street": ..., "houseNumber": ..., "zip": ...,
  "city": ..., "category": ..., "temporary": ..., "lon": ..., "lat": ..., "imagePath": ...}
*/
router.post('/', async function(req, res) {
  try {
    let locationToCreate = req.body;  
    console.log(locationToCreate);
    let locationId = await mongoCRUDs.insertOneLocation(locationToCreate);
    console.log(locationId);
    if (locationId) {
      res.set('Location', '/loc/' + locationId);
      res.status(201).send("Insertion successful.");
    } else {
      res.status(500).send("Location could not be inserted.");
    }
  } catch(error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the location.");
  }
});

// location can be retrieved by using "let locationId = req.params.id;" for '/loc/:id'

module.exports = router;
