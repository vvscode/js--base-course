const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';


export const city = {
  name: 'city',
  match: /city=(.+)/,
  onEnter: (city, eventBus) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
        const formattedAddress = data.results[0].formatted_address;
        const { lat, lng } = data.results[0].geometry.location;

        eventBus.on('history:add', formattedAddress);
        window.location.hash = `/coordinates?lat=${lat}&lng=${lng}`;
      })
      .catch(error => {
        console.log(error);
      })
  }
};
