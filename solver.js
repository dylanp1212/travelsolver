import dijkstras from './dijkstras.js';
import bfs from './bfs.js';
import countries from './assets/countries.json' with {type: 'json'};


const args = process.argv.slice(2);
function solver () {
  if (args.length < 2) {
    // console.log('bad arguments');
    return ('bad arguments');
  }
  const srcname = args[0];
  const endname = args[1];
  if (srcname == endname) {
    // console.log('start and end must be different countries');
    return ('start and end must be different countries');
  }
  let src = undefined;
  let end = undefined;

  for (let i = 0; i < countries.length; i ++) {
    if (countries[i].name == srcname) {
      src = i;
    } else if (countries[i].name == endname) {
      end = i;
    }
  }

  if (src == undefined) {
    // console.log('could not find country: ' + srcname);
    return ('could not find country: ' + srcname);
  } 
  if (end == undefined) {
    // console.log('could not find country: ' + endname);
    return ('could not find country: ' + endname);
  }
  let solution = [];
  if (args.includes('-d')) {
    solution = dijkstras(src, end);
  } else {
    solution = bfs(src, end);
  }

  if (solution.length < 1) {
    // console.log('Countries do not connect over land borders');
    return ('countries do not connect over land borders');
  }
  // console.log(solution);
  return (solution);
}

console.log(solver());