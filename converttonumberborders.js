import borders from './assets/borders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};


const numberborders = [];
for (let i = 0; i < borders.length; i++) {
  let country1 = undefined;
  let country2 = undefined;
  for (let k = 0; k < countries.length; k++) {
    if (countries[k].code == borders[i][0]) {
      country1 = k;
    } else if (countries[k].code == borders[i][1]) {
      country2 = k;
    }
  }
  if (!(country1 == undefined || country2 == undefined)) {
    // console.log('uh oh');
    numberborders.push([country1, country2]);
  }
}

console.log(JSON.stringify(numberborders));
