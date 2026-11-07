import countryborders from './assets/countryborders.json' with {type: 'json'};
import countries from './assets/countries.json' with {type: 'json'};
import adjborders from './assets/adjborders.json' with {type: 'json'};

// const args = process.argv.slice(2);
// const src = Number(args[0]);
// const end = Number(args[1]);

// const src = 64;
// const end = 97;

export default function dijkstras(src, end) {
  const dist = new Array(countryborders.length).fill(1000);
  const prev = new Array(countryborders.length).fill(-1);
  const pq = [];
  dist[src] = 0;
  pq.push([0, src]);

  while (pq.length > 0) {
    let minindex = 0;
    for (let i = 1; i < pq.length; i++) {
      if (pq[i][0] < pq[minindex][0]) minindex = i;
    }
    const [popped] = pq.splice(minindex, 1);
    const d = popped[0];
    const u = popped[1];
    // console.log(d + '' + u);
    if (d > dist[u]) continue;
    for (let [w, v] of adjborders[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        pq.push([dist[v], v]);
      }
    }
    // return (dist);
  }

  const path = [];
  if (dist[end] !== 1000) {
    for (let at = end; at !== -1; at = prev[at]) {
      path.push(at);
    }
    path.reverse();
  }

  const pathnames = [];
  for (let i = 0; i < path.length; i++) {
    pathnames.push(countries[path[i]].name);
  }

  return (pathnames);
  // console.log(pathnames);
  // console.log(dist[end]);
}