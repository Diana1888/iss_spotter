
const printTimes = function(passTimes) {
  for (const key in passTimes) {
    const time = passTimes[key].risetime;
    const date = new Date(time * 1000);
    const duration = passTimes[key].duration;
    console.log((`Next pass at ${date} for ${duration} seconds!`));
  }
};

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTimes(passTimes);
});