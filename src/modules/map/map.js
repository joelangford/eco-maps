import { Loader } from '@googlemaps/js-api-loader';
import calculateAndDisplayRoute from './route';
import addChargingStation from './charger';
import routesData from '../../data/routes.json';
import chargingStationsData from '../../data/charging-stations.json';

const loader = new Loader({
  apiKey: 'AIzaSyB6EQLQGwYWwD0JDQBDdotn-XTjUQmZmHM',
  version: 'weekly',
  libraries: ['directions']
});

const initMap = () => {
  loader
    .load()
    .then((google) => {
      const directionsService = new google.maps.DirectionsService();
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: 51.4583674, lng: -0.9736686},
      });

      routesData.routes.map(route => {
        calculateAndDisplayRoute(directionsService, map, route);
      });

      chargingStationsData.chargingStations.map(chargingStation => {
        addChargingStation(map, chargingStation);
      });
    })
    .catch(e => {
      console.log(e);
    });
}

export default initMap;
