const getBusyStatus = (totalChargers, chargersInUse) => {
  const level = (chargersInUse / (totalChargers / 3))

  switch (Math.floor(level)) {
    case 3:
      return 'full'
    case 2:
      return 'busy'
    default:
      return 'not-busy'
  }
}

const addChargingStation = (google, map, chargingStation) => {
  const busyStatus = getBusyStatus(chargingStation.chargers, chargingStation.ocupationLevel)

  const contentString = `
    <div class="charger-popup">
      <h1 class="charger-popup__title">Charging Station</h1>
      <h2 class="charger-popup__status charger-popup__status--${busyStatus}">${busyStatus.replace('-', ' ')}</h2>
      <div>${chargingStation.ocupationLevel}/${chargingStation.chargers} chargers in use</div>
    </div>
  `

  const infowindow = new google.maps.InfoWindow({
    content: contentString
  })

  const chargerIcon = {
    path: 'M420,320V65c0-35.841-29.159-65-65-65s-65,29.159-65,65v330c0,19.299-15.701,35-35,35s-35-15.701-35-35v-45h40V70h-30v190H30V70H0v280h190v45c0,35.841,29.159,65,65,65s65-29.159,65-65V65c0-19.299,15.701-35,35-35s35,15.701,35,35v255h-40v90h10v50h30v-50h30v50h30v-50h10v-90H420z M45,320c-8.284,0-15-6.716-15-15s6.716-15,15-15s15,6.716,15,15S53.284,320,45,320z',
    fillColor: 'black',
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.075,
    anchor: new google.maps.Point(200, 200)
  }

  const marker = new google.maps.Marker({
    position: chargingStation.latLng,
    map,
    icon: chargerIcon
  })

  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
  })
}

export default addChargingStation
