import numberborders from './assets/numberborders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};


const adjborders = [];
for (let i = 0; i < countries.length; i++) {
  const iborders = [];
  for (let k = 0; k < numberborders.length; k++) {
    if (numberborders[k][0] == i) {
      iborders.push([1, numberborders[k][1]]);
    }
  }
  adjborders.push(iborders);
}

console.log(JSON.stringify(adjborders));
