const { MongoClient } = require("mongodb");

const db_user = "outskirt_eco_watch_s0586888";
const db_pass = "dQqXZ8jzq";
const db_name = "outskirt_eco_watch";
const dbHostname = "mongodb1.f4.htw-berlin.de";
const dbPort = 27017;
const uri = `mongodb://${db_user}:${db_pass}@${dbHostname}:${dbPort}/${db_name}`;
const db_users = "users";
const db_locations = "locations";

function MongoCRUDs (db_name, uri) {
    this.db_name = db_name;
    this.uri = uri;
} 

MongoCRUDs.prototype.findOneUser  = async function(uNameIn, passwdIn) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const users = database.collection(db_users);
    const query = {username: uNameIn, password: passwdIn};
    const doc = await users.findOne(query);
    if (doc) {
      delete doc.password;
    }
    return doc;
  } finally {
    await client.close();
  }
};

MongoCRUDs.prototype.findAllUsers  = async function() {
  const client = new MongoClient(uri);
  try {  
    const database = client.db(db_name);
    const users = database.collection(db_users);
    const query = {};
    const cursor = users.find(query);
    if ((await users.countDocuments(query)) === 0) {
      console.log("No documents found!");
      return null;
    }
    let docs = new Array();
    for await (const doc of cursor) {
      delete doc.password;
      docs.push(doc);
    }
    return docs;
  } finally {
    await client.close();
  }
};

MongoCRUDs.prototype.findOneLocation  = async function(locationId) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const locations = database.collection(db_locations);
    const query = {id: locationId};
    const doc = await locations.findOne(query);
    return doc;
  } finally {
    await client.close();
  }
};

MongoCRUDs.prototype.findAllLocations  = async function() {
  const client = new MongoClient(uri);
  try {  
    const database = client.db(db_name);
    const locations = database.collection(db_locations);
    const query = {};
    const cursor = locations.find(query);
    if ((await locations.countDocuments(query)) === 0) {
      console.log("No documents found!");
      return null;
    }
    let docs = new Array();
    for await (const doc of cursor) {
      docs.push(doc);
    }
    return docs;
  } finally {
    await client.close();
  }
};

MongoCRUDs.prototype.insertOneLocation = async function(location) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const coll = database.collection(db_locations);
    let doc = {
      "name": location.name,
      "description": location.description,
      "street": location.street,
      "houseNumber": location.houseNumber,
      "zip": location.zip,
      "city": location.city,
      "category": location.category,
      "temporary": location.temporary,
      "lon": location.lon,
      "lat": location.lat,
      "imagePath": location.imagePath
    };
    const result = await coll.insertOne(doc); 
    return result.insertedId;
  } finally {
    await client.close();
  }
}

MongoCRUDs.prototype.replaceOneLocation = async function(id, location) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const coll = database.collection(db_locations);
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const replaceDoc = {
      "name": location.name,
      "description": location.description,
      "street": location.street,
      "houseNumber": location.houseNumber,
      "zip": location.zip,
      "city": location.city,
      "category": location.category,
      "temporary": location.temporary,
      "lon": location.lon,
      "lat": location.lat,
      "imagePath": location.imagePath
    };
    const result = await coll.replaceOne(query, replaceDoc);
    console.log(result);
    if (result.modifiedCount === 1) {
      console.log("Successfully updated one document.");
      return true;
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
      return false;
    }
  } finally { 
    await client.close(); 
  }
}

MongoCRUDs.prototype.deleteOneLocation = async function(id) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const coll = database.collection(db_locations);
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const result = await coll.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      return true;
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      return false;
    }
  } finally {
    await client.close();
  }
}

const mongoCRUDs = new MongoCRUDs(db_name, uri);

module.exports = mongoCRUDs;