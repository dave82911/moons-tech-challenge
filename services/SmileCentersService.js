const SmileCentersRepository = require('../repositories/SmileCentersRepository');

const SmileCentersService = module.exports;

const logName = 'SmileCentersService: ';

const setAppointmentTypeId = (serviceType, smileCenters = []) => smileCenters.map(
  (smileCenter) => ({ ...smileCenter, Appointment_Type_Id: smileCenter.Services[serviceType].AppointmentTypeId }),
);

SmileCentersService.getSmileCenters = async (filters = {}) => {
  console.log(logName, `Trying to get smile centers with filters: ${JSON.stringify(filters)}`);

  const {
    centerType, zone, serviceType,
  } = filters;

  if (zone && !centerType && !serviceType) {
    return SmileCentersRepository.byZone(zone);
  }

  if (!zone && centerType && !serviceType) {
    return SmileCentersRepository.byCenterType(centerType);
  }

  if (!zone && !centerType && serviceType) {
    const smileCenters = await SmileCentersRepository.byServiceType(serviceType);

    return setAppointmentTypeId(serviceType, smileCenters);
  }

  if (zone && centerType && !serviceType) {
    return SmileCentersRepository.byZoneAndCenterType(zone, centerType);
  }

  if (zone && !centerType && serviceType) {
    const smileCenters = await SmileCentersRepository.byZoneAndServiceType(zone, serviceType);

    return setAppointmentTypeId(serviceType, smileCenters);
  }

  if (!zone && centerType && serviceType) {
    const smileCenters = await SmileCentersRepository.byCenterTypeAndServiceType(centerType, serviceType);

    return setAppointmentTypeId(serviceType, smileCenters);
  }

  if (zone && centerType && serviceType) {
    const smileCenters = await SmileCentersRepository.zoneAndCenterTypeAndServiceType(zone, centerType, serviceType);

    return setAppointmentTypeId(serviceType, smileCenters);
  }

  return SmileCentersRepository.getAllSmileCenters();
};

SmileCentersService.listZones = async () => {
  console.log(logName, 'Trying to list zones');

  return SmileCentersRepository.listZones();
};

SmileCentersService.centerTypes = async () => {
  console.log(logName, 'Trying to list center types');

  return SmileCentersRepository.centerTypes();
};

SmileCentersService.services = async () => {
  console.log(logName, 'Trying to list services');

  let smileCenters = await SmileCentersRepository.services();
  smileCenters = smileCenters.map((smileCenter) => Object.keys(smileCenter.Services));

  let services = [];
  smileCenters.forEach((smileCenter) => {
    services = services.concat(smileCenter);
  });

  return [...new Set(services)].sort();
};
