"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationDetailsFromLocMap = getLocationDetailsFromLocMap;

function getLocationDetailsFromLocMap(locMap, locId) {
  var locationIds = Object.keys(locMap);
  var i = 0;
  var locFound = false;
  var locDetails = null;

  while (!locFound && i < locationIds.length) {
    var currentLocationId = locationIds[i];
    var currentLocDetails = locMap[currentLocationId];

    if (currentLocationId === locId) {
      locDetails = currentLocDetails;
      locFound = true;
    } else {
      if (currentLocDetails.children) {
        return getLocationDetailsFromLocMap(currentLocDetails.children, locId);
      }
    }

    i += 1;
  }

  return locDetails || {};
}