import rawborders from './assets/rawborders.json' with {type: 'json'};


const borders = [];
for (let i = 0; i < rawborders.length; i++) {
  if (i % 4 == 0) {
    borders.push([rawborders[i], rawborders[i + 2]]);
  }
}

console.log(JSON.stringify(borders));
// console.log(rawborders[0]);
// console.log('hi');