import dijkstras from './dijkstras.js';
import bfs from './bfs.js';
import countries from './assets/countries.json' with {type: 'json'};


function getflag(code) {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const args = process.argv.slice(2);

function solver () {
//   console.log(`          ___,
//      _.-'\` __|__
//    .'  ,-:\` \\;',\`'-, 
//   /  .'-;_,;  ':-;_,'.
//  /  /;   '/    ,  _\`.-\\
// |  | '\`. (\`     /\` \` \\\`|
// |  |:.  \`\\\`-.   \\_   / |
// |  |     (   \`,  .\`\\ ;'|
//  \\  \\     | .'     \`-'/
//   \\  \`.   ;/        .'
//    '._ \`'-._____.-'\`
//       \`-.____|
//         _____|_____
//        /___________\\`)
  // console.log();
  if (args.includes('-r')) {
    let rsolution = [];
    while (rsolution.length < 1) {
      const rsrc = Math.floor(Math.random() * 248) + 1;
      let rend = Math.floor(Math.random() * 248) + 1;
      if (rend == rsrc) {
        while (rend == rsrc) {
          rend = Math.floor(Math.random() * 248) + 1;
        }
      }
      rsolution = bfs(rsrc, rend, []);
      if (rsolution.length < 1) {
        continue;
      }
      process.stdout.write(getflag(countries[rsrc].code) + '   ->  ' + getflag(countries[rend].code));
      console.log();
      console.log(`solving with \x1b[1mbfs\x1b[0m...`);
      console.log(`\x1b[2msolution distance:\x1b[0m \x1b[1m\x1b[32m${rsolution.length - 2}\x1b[0m`);
      console.log('\x1b[2msolution:\x1b[0m')
      process.stdout.write(`\x1b[1m\x1b[35m${rsolution[0]} -> \x1b[0m`);
      for (let i = 1; i < rsolution.length - 1; i++) {
        process.stdout.write(rsolution[i] + ' -> ');
      }
      process.stdout.write(`\x1b[1m\x1b[36m${rsolution[rsolution.length - 1]}\x1b[0m`);
      console.log();
      return;
    }
  }
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

  process.stdout.write(getflag(countries[src].code) + '   ->  ' + getflag(countries[end].code));
  // console.log();
  if (ignore.length > 0) {
    process.stdout.write(' ,  ');
    process.stdout.write(`\x1b[1m\x1b[31mX\x1b[0m `);
    for (let i = 0; i < ignore.length; i++) {
      process.stdout.write(getflag(countries[ignore[i]].code) + '  ');
    }
    // console.log();
  }
  console.log();

  let solution = [];
  if (args.includes('-d')) {
    console.log(`solving with \x1b[1mdijkstra's\x1b[0m...`);
    solution = dijkstras(src, end, ignore);
  } else {
    console.log(`solving with \x1b[1mbfs\x1b[0m...`);
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
  console.log(`\x1b[2msolution distance:\x1b[0m \x1b[1m\x1b[32m${solution.length - 2}\x1b[0m`);
  console.log('\x1b[2msolution:\x1b[0m')
  process.stdout.write(`\x1b[1m\x1b[35m${solution[0]} -> \x1b[0m`);
  for (let i = 1; i < solution.length - 1; i++) {
    process.stdout.write(solution[i] + ' -> ');
  }
  process.stdout.write(`\x1b[1m\x1b[36m${solution[solution.length - 1]}\x1b[0m`);
  console.log();
  return;
}

solver();