import rawborders from './assets/rawborders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};


const countryborders = [...countries];
// console.log(countryborders[0]);
for (let i = 0; i < rawborders.length; i++) {
  if (i % 4 == 0) {
    for (let k = 0; k < countries.length; k++) {
      if (countries[k].code == rawborders[i]) {
        if (!countries[k].borders) {
          countries[k].borders = [];
        }
        countries[k].borders.push(rawborders[i + 2]);
      }
      // break
    }
  }
}

console.log(JSON.stringify(countryborders));
