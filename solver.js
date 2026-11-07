import dijkstras from './dijkstras.js';
import bfs from './bfs.js';
import countries from './assets/countries.json' with {type: 'json'};


const args = process.argv.slice(2);
function solver () {
  console.log();
  if (args.length < 2) {
    console.log('bad arguments');
    console.log('useage: solver.js <start country> <end country>');
    console.log(`use optional flag -d to use dijkstra's algorithm, default is bfs`);
    return;
  }
  const srcname = args[0];
  const endname = args[1];
  if (srcname == endname) {
    console.log('start and end must be different countries');
    return;
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
    console.log('could not find country: ' + srcname);
    return;
  } 
  if (end == undefined) {
    console.log('could not find country: ' + endname);
    return;
  }

  const ignore = [];
  if (args.includes('-i') && args.length > args.indexOf('-i') + 1) {
    for (let i = args.indexOf('-i') + 1; i < args.length; i++) {
      for (let k = 0; k < countries.length; k ++) {
        if (countries[k].name == args[i]) {
          if (k == src || k == end) {
            console.log('cannot ignore start or end');
            return;
          }
          ignore.push(k);
        }
      }
    }
  }

  let solution = [];
  if (args.includes('-d')) {
    console.log(`solving with dijkstra's`);
    solution = dijkstras(src, end, ignore);
  } else {
    console.log(`solving with bfs`);
    solution = bfs(src, end, ignore);
  }

  if (solution.length < 1) {
    if (args.includes('-i')) {
      const nonignoredsolution = bfs(src, end, []);
      if (nonignoredsolution.length < 1) {
        console.log('countries do not connect over land borders');
        return;
      } else {
        console.log('countries do not connect over land borders without ignored countires');
        console.log('there is a path that uses ignored countries');
        return;
      }
    }
    console.log('countries do not connect over land borders');
    return;
  }
  console.log(solution);
  return;
}

solver();