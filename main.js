require('dotenv').config();

const logName = 'main: ';

const SmileCentersService = require('./services/SmileCentersService');

Parse.Cloud.define('hello', () => 'Hello world!');

Parse.Cloud.define('listSmileCenters', async (request) => {
  const { params } = request;

  console.log(logName, `Trying to listSmileCenters with params ${JSON.stringify(params)}`);
  const { center_type: centerType, zone, service_type: serviceType } = params;

  let smileCenters = await SmileCentersService.getSmileCenters({
    centerType, zone, serviceType,
  });

  smileCenters = smileCenters.map((smileCenter) => ({
    _id: smileCenter._id,
    calendarId: smileCenter.Calendar_Id,
    appointmentTypeId: smileCenter.Appointment_Type_Id,
    zone: smileCenter.Zone,
    promo: smileCenter.promo,
    street: smileCenter.Street,
    neighborhood: smileCenter.Neighborhood,
    centerType: smileCenter.Center_Type,
    timetable: smileCenter.Timetable,
    services: smileCenter.Services,
  }));

  try {
    return {
      centerType, zone, serviceType, smileCenters,
    };
  } catch (e) {
    console.error(logName, `Error listSmileCenters: ${e}`);

    return { error: e };
  }
});

Parse.Cloud.define('zones', async () => {
  console.log(logName, 'Trying to list zones');

  try {
    return SmileCentersService.listZones();
  } catch (e) {
    console.error(logName, `Error list zones: ${e}`);

    return { error: e };
  }
});

Parse.Cloud.define('centerTypes', async () => {
  console.log(logName, 'Trying to list zones');

  try {
    return SmileCentersService.centerTypes();
  } catch (e) {
    console.error(logName, `Error list center types: ${e}`);

    return { error: e };
  }
});

Parse.Cloud.define('services', async () => {
  console.log(logName, 'Trying to list services');

  try {
    return SmileCentersService.services();
  } catch (e) {
    console.error(logName, `Error list center types: ${e}`);

    return { error: e };
  }
});
