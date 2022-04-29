import login from './modules/login';
import initMap from './modules/map';
import initSidebar from './modules/sidebar';

login(() => {
  // Callbacks
  initMap();
  initSidebar();
});
