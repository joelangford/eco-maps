import { Loader } from '@googlemaps/js-api-loader';
import routesData from '../data/routes.json';
import chargingStationsData from '../data/charging-stations.json';

const loader = new Loader({
  apiKey: 'AIzaSyB6EQLQGwYWwD0JDQBDdotn-XTjUQmZmHM',
  version: 'weekly',
  libraries: ['directions']
});

const animatePath = (pathPlots, map) => {
  let position = 0;

  const bikeIcon = {
    path: "M393.043,206.632c-9.813,0-19.641,1.697-29.208,5.044l-1.996,0.698l-32.147-58.406v-25.365h38.517 c7.402,0,13.424-6.022,13.424-13.425s-6.021-13.425-13.424-13.425h-51.039c-7.401,0-13.424,6.022-13.424,13.425 c0,1.084,0.148,2.211,0.44,3.349l0.078,0.306v25.69H187.152l-9.644-21.476h27.897c7.009,0,12.71-5.703,12.71-12.714 c0-7.01-5.701-12.713-12.71-12.713h-95.083c-7.011,0-12.714,5.703-12.714,12.713c0,7.011,5.703,12.714,12.714,12.714h39.322 l8.49,19.248l-38.149,70.096l-2.007-0.703c-9.557-3.351-19.38-5.049-29.198-5.049C39.827,206.639,0,246.468,0,295.423 c0,48.953,39.827,88.779,88.78,88.779c43.436,0,80.206-31.113,87.434-73.98l0.351-2.086h37.787l0.724,0.688 c5.776,5.48,13.335,8.5,21.284,8.5c17.056,0,30.932-13.876,30.932-30.932c0-2.946-0.422-5.881-1.255-8.719l-0.293-0.998 l51.233-93.079l22.596,41.054l-1.652,1.312c-21.39,16.999-33.657,42.316-33.657,69.462c0,48.952,39.826,88.778,88.779,88.778 s88.78-39.826,88.78-88.778C481.823,246.464,441.996,206.632,393.043,206.632z M129.84,247.173l2.349,2.219 c8.702,8.213,14.881,18.647,17.867,30.177l0.811,3.127h-40.578L129.84,247.173z M150.056,311.265 c-7.254,27.965-32.451,47.496-61.274,47.496c-34.934,0-63.354-28.42-63.354-63.354s28.421-63.353,63.354-63.353 c5.101,0,10.373,0.686,15.672,2.039l3.128,0.8l-29.93,54.403c-0.076,0.199-0.158,0.396-0.259,0.59 c-0.208,0.43-0.363,0.803-0.488,1.164c-0.175,0.463-0.294,0.838-0.382,1.197c-0.099,0.373-0.169,0.73-0.239,1.193 c-0.085,0.504-0.126,0.924-0.131,1.293l-0.005,0.132c-0.012,0.169-0.034,0.339-0.06,0.51l-0.007,0.056l0.005,0.041 c0.02,0.144,0.036,0.285,0.045,0.426c0.028,0.504,0.081,0.981,0.145,1.453c0.054,0.344,0.116,0.729,0.214,1.114 c0.094,0.378,0.208,0.751,0.354,1.153c0.149,0.45,0.293,0.811,0.464,1.174c0.156,0.348,0.338,0.66,0.549,1.023l0.051,0.089 c0.215,0.377,0.407,0.674,0.611,0.944c0.229,0.313,0.479,0.619,0.814,0.994c0.263,0.285,0.534,0.586,0.834,0.86 c0.31,0.28,0.638,0.541,0.97,0.803c0.319,0.239,0.675,0.503,1.029,0.706l0.147,0.092c0.101,0.067,0.201,0.143,0.302,0.219 l0.092,0.067c0.202,0.064,0.4,0.148,0.598,0.255c0.341,0.166,0.741,0.334,1.105,0.459c0.461,0.17,0.852,0.293,1.258,0.398 c0.317,0.084,0.647,0.15,1.119,0.227c0.499,0.084,0.962,0.131,1.427,0.148c0.136-0.008,0.346,0.021,0.565,0.05l62.087,0.009 L150.056,311.265z M212.542,266.657c-3.338,4.023-5.611,8.865-6.574,13.998l-0.383,2.039h-29.02l-0.351-2.085 c-3.637-21.568-15.111-40.981-32.312-54.661l-1.651-1.313l29.183-53.023l42.102,93.848L212.542,266.657z M247.331,257.394 l-1.94-0.592c-2.246-0.686-4.594-1.11-6.979-1.268l-1.502-0.098l-38.342-85.497h96.908L247.331,257.394z M393.043,358.761 c-34.933,0-63.353-28.42-63.353-63.354c0-17.544,7.082-33.887,19.941-46.018l2.35-2.217l29.927,54.367 c2.227,4.061,6.499,6.58,11.15,6.58c2.17,0,4.229-0.529,6.122-1.575c2.977-1.635,5.133-4.331,6.076-7.593 c0.944-3.264,0.563-6.705-1.077-9.688l-29.925-54.372l3.126-0.8c5.291-1.354,10.564-2.04,15.678-2.04 c34.934,0,63.354,28.42,63.354,63.353C456.396,330.341,427.97,358.761,393.043,358.761z",
    fillColor: "black",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.075,
    anchor: new google.maps.Point(200, 200),
  };

  const marker = new google.maps.Marker({
    position: pathPlots[position],
    map,
    icon: bikeIcon,
  });

  const route = new google.maps.Polyline({
      path: pathPlots,
      strokeColor: 'teal',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: map,
      visible: false,
  });

  const incrementPath = window.setInterval(function(){
    position ++;
    if (position < pathPlots.length) {
      marker.setPosition(pathPlots[position]);
    } else {
      clearInterval(incrementPath);
    }
  }, 500);

  google.maps.event.addListener(marker, 'click', function() {
    if (route.getVisible()) {
      route.setVisible(false);
    } else {
      route.setVisible(true);
    }
  });
};

const calculateAndDisplayRoute = (directionsService, map, route) => {
  directionsService
    .route({
      origin: route.origin,
      destination: route.destination,
      travelMode: google.maps.TravelMode[route.method],
    })
    .then((response) => {
      var route = response.routes[0].overview_path;
      var linePath = [];
      route.forEach(location => {
        linePath.push({lat: parseFloat(location.lat()), lng: parseFloat(location.lng())});
      })
      animatePath(linePath, map);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

const getBusyStatus = (totalChargers, chargersInUse) => {
  const level = (chargersInUse / (totalChargers / 3));

  switch(Math.floor(level)) {
    case 3:
      return 'full';
    case 2:
      return 'busy';
    default:
      return 'not-busy';
  }
}

const addChargingStation = (map, chargingStation) => {
  const busyStatus = getBusyStatus(chargingStation.chargers, chargingStation.ocupationLevel);

  const contentString = `
    <div>
      <h1>Charging Station</h1>
      <h2 class=${busyStatus}>${busyStatus}</h2>
      <div>${chargingStation.ocupationLevel}/${chargingStation.chargers} chargers in use</div>
    </div>
  `;

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  const chargerIcon = {
    path: "M420,320V65c0-35.841-29.159-65-65-65s-65,29.159-65,65v330c0,19.299-15.701,35-35,35s-35-15.701-35-35v-45h40V70h-30v190H30V70H0v280h190v45c0,35.841,29.159,65,65,65s65-29.159,65-65V65c0-19.299,15.701-35,35-35s35,15.701,35,35v255h-40v90h10v50h30v-50h30v50h30v-50h10v-90H420z M45,320c-8.284,0-15-6.716-15-15s6.716-15,15-15s15,6.716,15,15S53.284,320,45,320z",
    fillColor: "black",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.075,
    anchor: new google.maps.Point(200, 200),
  };

  const marker = new google.maps.Marker({
    position: chargingStation.latLng,
    map,
    icon: chargerIcon,
  });

  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
}

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
