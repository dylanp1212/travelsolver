import countryborders from './assets/countryborders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};
import adjborders from './assets/adjborders.json' with {type: 'json'};


export default function bfs(src, end, ignore) {
  const vis = new Array(countryborders.length).fill(false);
  const parent = new Array(countryborders.length).fill(undefined);
  const res = [];
  const queue = [];

  // for (let i = 0; i < ignore.length; i++) {
  //   adjborders[ignore[i]] = [];
  // }
  // for (let i = 0; i < adjborders.length; i++) {
  //   for (let k = 0; k < adjborders[i].length; k++) {
  //     if (ignore.includes(adjborders[i][k])) {
  //       adjborders[i].splice(k, 1)
  //     }
  //   }
  // }
  
  vis[src] = true;
  res.push(src);
  queue.push(src);

  while (queue.length > 0) {
    const n = queue.shift();
    if (n === end) break;
    for (let i = 0; i < adjborders[n].length; i++) {
      if (!vis[adjborders[n][i][1]] && !ignore.includes(adjborders[n][i][1])) {
        queue.push(adjborders[n][i][1]);
        parent[adjborders[n][i][1]] = n;
        vis[adjborders[n][i][1]] = true;
      }
    }
  }

  const path = [];
  if (parent[end] != undefined) {
    for (let i = end; i != undefined; i = parent[i]) {
      // console.log(i);
      path.push(i);
    }
    path.reverse();
  }

  const pathnames = [];
  for (let i = 0; i < path.length; i++) {
    pathnames.push(countries[path[i]].name);
  }

  return(pathnames);
}