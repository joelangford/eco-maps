import login from './modules/login'
import initMap from './modules/map/map'
import initSidebar from './modules/sidebar'

login(() => {
  // Callback functions called after sucessful login.
  initMap()
  initSidebar()
})
