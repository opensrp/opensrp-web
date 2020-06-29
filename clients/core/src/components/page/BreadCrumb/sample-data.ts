const getLocationData = () => {
    const locationData = localStorage.getItem('_location');
    const anyData: any = {};
    return locationData == null ? anyData : JSON.parse(locationData);
};

export default getLocationData;
