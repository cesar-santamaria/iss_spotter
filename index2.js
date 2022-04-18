const { nextISSTimesForMyLocation } = require('./iss_promised');
const { passTimesOutput } = require('./index')

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimesOutput(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });