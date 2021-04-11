// Colors derived from https://www.schemecolor.com/traffic-red-yellow-green.php
const trafficColors = {
  green: {
    name: 'green',
    hex: '#008450',
  },
  red: {
    name: 'red',
    hex: '#B81D13',
  },
  white: {
    name: 'white',
    hex: '#FFF',
  },
  yellow: {
    name: 'yellow',
    hex: '#EFB700',
  },
};

/**
 * The following are a collection of colors that are allowed
 * as responses from the Traffic API.
 */
const allowedColors = ['red', 'green', 'yellow'];

export {
  allowedColors,
  trafficColors,
};
