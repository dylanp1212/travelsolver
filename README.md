This program finds the shortest path (fewest countries) between two countries or territories.
I was inspired by the game travle.earth.

To run it in the terminal use the command
  node solver.js <starting country> <ending country>
Optional flags:
  -d to use Dijkstra's algorithm instead of the default BFS
  -i <country to ignore> <second country to ignore> <nth country to ignore> to ignore countries from the path

Note: countries use official names (eg. Russian Federation instead of Russia). A list of all countries' names can be found in countries.json.
For names with spaces, you must wrap in quotes in the command line.
