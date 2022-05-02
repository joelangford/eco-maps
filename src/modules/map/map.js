import { Loader } from '@googlemaps/js-api-loader'
import calculateAndDisplayRoute from './route'
import addChargingStation from './charger'
import routesData from '../../data/routes.json'
import chargingStationsData from '../../data/charging-stations.json'

const loader = new Loader({
  apiKey: process.env.GMAPS_API_KEY,
  version: 'weekly',
  libraries: ['directions']
})

const initMap = () => {
  loader
    .load()
    .then((google) => {
      const directionsService = new google.maps.DirectionsService()
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 51.4583674, lng: -0.9736686 }
      })

      // loop around the data for each route, then process and render it.
      routesData.routes.forEach(route => {
        calculateAndDisplayRoute(google, directionsService, map, route)
      })

      // loop around the data for each charging station, then process and render it
      chargingStationsData.chargingStations.forEach(chargingStation => {
        addChargingStation(google, map, chargingStation)
      })
    })
    .catch(e => {
      console.log(e)
    })
}

export default initMap
