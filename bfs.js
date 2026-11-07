import countryborders from './assets/countryborders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};
import adjborders from './assets/adjborders.json' with {type: 'json'};


export default function bfs(src, end) {
  const vis = new Array(countryborders.length).fill(false);
  const parent = new Array(countryborders.length).fill(undefined);
  const res = [];
  const queue = [];
  
  vis[src] = true;
  res.push(src);
  queue.push(src);

  while (queue.length > 0) {
    const n = queue.shift();
    for (let i = 0; i < adjborders[n].length; i++) {
      if (!vis[adjborders[n][i][1]]) {
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