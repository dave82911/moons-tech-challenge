const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const database = process.env.SMILE_CENTERS_DB;
let client;

const SmileCentersSchema = 'SmileCenters';
const logName = 'SmileCentersRepository: ';

const SmileCentersService = module.exports;
async function connectToDatabase() {
  if (!client) {
    console.log(logName, `Connecting with mongodb uri: ${uri}`);
    client = new MongoClient(uri, {});

    await client.connect();

    console.log(logName, 'Connected to MongoDB');
  }

  return client.db(database); // Replace with your database name
}

SmileCentersService.byCenterType = async (centerType) => {
  console.log(logName, `filter by centerType with value: ${centerType}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Center_Type: centerType,
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Center_Type: ${error}`);

    throw new Error(`Error retrieving smile centers by Center_Type: ${error.message}`);
  }
};

SmileCentersService.byZone = async (zone) => {
  console.log(logName, `filter by zone with value: ${zone}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Zone: zone,
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Zone: ${error}`);

    throw new Error(`Error retrieving smile centers by Center_Type: ${error.message}`);
  }
};

SmileCentersService.byZoneAndCenterType = async (zone, centerType) => {
  console.log(logName, `filter by zone and center type with value: ${zone} and ${centerType}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Zone: zone,
      Center_Type: centerType,
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Zone and Center_Type: ${error}`);

    throw new Error(`Error retrieving smile centers by Zone and Center_Type: ${error.message}`);
  }
};

SmileCentersService.byServiceType = async (serviceType) => {
  console.log(logName, `filter by serviceType with value: ${serviceType}}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      [`Services.${serviceType}`]: { $exists: true },
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Service: ${error}`);

    throw new Error(`Error retrieving smile centers by Service: ${error.message}`);
  }
};

SmileCentersService.byZoneAndServiceType = async (zone, serviceType) => {
  console.log(logName, `filter by zone and service type with value: ${zone} and ${serviceType}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Zone: zone,
      [`Services.${serviceType}`]: { $exists: true },
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Zone and Service: ${error}`);

    throw new Error(`Error retrieving smile centers by Zone and Service: ${error.message}`);
  }
};

SmileCentersService.byCenterTypeAndServiceType = async (centerType, serviceType) => {
  console.log(logName, `filter by centerType and service type with value: ${centerType} and ${serviceType}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Center_Type: centerType,
      [`Services.${serviceType}`]: { $exists: true },
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Center_Type and Service: ${error}`);

    throw new Error(`Error retrieving smile centers by Center_Type and Service: ${error.message}`);
  }
};

SmileCentersService.zoneAndCenterTypeAndServiceType = async (zone, centerType, serviceType) => {
  console.log(logName, `filter by zone, centerType and service with values: ${zone} ${centerType} and ${serviceType}`);
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find({
      Zone: zone,
      Center_Type: centerType,
      [`Services.${serviceType}`]: { $exists: true },
    }).toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers by Zone, Center_Type and Service: ${error}`);

    throw new Error(`Error retrieving smile centers by Zone, Center_Type and Service: ${error.message}`);
  }
};

SmileCentersService.getAllSmileCenters = async () => {
  console.log(logName, 'getAllSmileCenters from mongodb');
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find().toArray();
  } catch (error) {
    console.error(logName, `Error retrieving smile centers: ${error}`);

    throw new Error(`Error retrieving smile centers: ${error.message}`);
  }
};

SmileCentersService.listZones = async () => {
  console.log(logName, 'retrieve listZones from mongodb');
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).distinct('Zone');
  } catch (error) {
    console.error(logName, `Error retrieving zones from smile center collection: ${error}`);

    throw new Error(`Error retrieving zones from smile center collection: ${error.message}`);
  }
};

SmileCentersService.centerTypes = async () => {
  console.log(logName, 'retrieve centerTypes from mongodb');
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).distinct('Center_Type');
  } catch (error) {
    console.error(logName, `Error retrieving center types from smile center collection: ${error}`);

    throw new Error(`Error retrieving center types from smile center collection: ${error.message}`);
  }
};

SmileCentersService.services = async () => {
  console.log(logName, 'retrieve services from mongodb');
  try {
    const db = await connectToDatabase();

    return db.collection(SmileCentersSchema).find().toArray();
  } catch (error) {
    console.error(logName, `Error retrieving center types from smile center collection: ${error}`);

    throw new Error(`Error retrieving center types from smile center collection: ${error.message}`);
  }
};
