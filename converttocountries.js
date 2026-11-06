import rawborders from './assets/rawborders.json' with {type: 'json'};


const countries = [];
for (let i = 0; i < rawborders.length; i++) {
  if (i % 4 == 0) {
    if (!countries.some((country) => country.code == rawborders[i])) {
      countries.push({code: rawborders[i], name: rawborders[i + 1]});
    }
  }
}

console.log(JSON.stringify(countries));
// console.log(rawborders[0]);
// console.log('hi');