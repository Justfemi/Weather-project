let latlng;
let btn = document.querySelector('#search-btn');

const options = {
  key: 'K6nwe7jGOglTjVykn7AFR9NQ84ga8Cdt',

  // Put additional console output
  verbose: true,

  // Optional: Initial state of the map
  lat: 50.4,
  lon: 14.3,
  zoom: 5,
};


// Initialize Windy API
windyInit(options, windyAPI => {
  // const { store, broadcast } = windyAPI;

  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)


  // L.Control.geocoder().addTo(map);

  // var searchbox = L.control.searchbox({
  //   position: 'topright',
  //   expand: 'left'
  // }).addTo(map);
});


btn.addEventListener('click', 
  function search() {
    console.log('search-btn clicked')
  }
);
