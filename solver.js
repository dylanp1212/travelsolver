import dijkstras from './dijkstras.js';
import bfs from './bfs.js';

const args = process.argv.slice(2);
const src = Number(args[0]);
const end = Number(args[1]);

// const solution = dijkstras(src, end);
const solution = bfs(src, end);
if (solution.length < 1) {
  console.log('Countries do not connect over land borders');
} else {
  console.log(solution);
}