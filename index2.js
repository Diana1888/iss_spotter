const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (const key in passTimes) {
    const time = passTimes[key].risetime;
    const date = new Date(time * 1000);
    const duration = passTimes[key].duration;
    console.log((`Next pass at ${date} for ${duration} seconds!`));
  }
};


nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes)
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});
