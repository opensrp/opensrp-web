"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationDetailsFromLocMap = getLocationDetailsFromLocMap;

function getLocationDetailsFromLocMap(locMap, locId) {
  var locationIds = Object.keys(locMap);
  var i = 0;
  var locFound = false;
  var locDetails = {};

  while (!locFound && i < locationIds.length) {
    var currentLocationId = locationIds[i];
    var currentLocDetails = locMap[currentLocationId];

    if (currentLocationId === locId) {
      locDetails = currentLocDetails;
      locFound = true;
    } else {
      if (currentLocDetails.children) {
        locDetails = getLocationDetailsFromLocMap(currentLocDetails.children, locId);

        if (Object.keys(locDetails).length) {
          locFound = true;
        }
      }
    }

    i += 1;
  }

  return locDetails;
}