import { Graph } from "./index.js";

// distance - number of nodes traversed, including start and end 
// path - number of paths traversed
// https://en.wikipedia.org/wiki/Dijkstra's_algorithm#Pseudocode
export function dijkstra(graph: Graph, start: string, end: string): { distance: number, path: string[] } | null {
	// TODO: check if start and end node is in adjacencyDict?

	const graphNodes = Object.keys(graph.adjacencyDict);

	// from source to key
	const dists: {
		[key: string]: number,
	} = {};
	const prev: {
		[key: string]: string,
	} = {};
	const notVisited: string[] = [];

	graphNodes.forEach((node) => {
		dists[node] = Infinity;
		prev[node] = null;
		notVisited.push(node);
	});
	dists[start] = 0;

	while (notVisited.length > 0) {
		const [node] = notVisited.sort((node1, node2) => dists[node1] - dists[node2])
		const distance = dists[node];

		if (node === end) {
			const path: string[] = [];

			let currentNode = end;

			if (prev[currentNode] == null && currentNode !== start) {
				return null;
			}

			while (currentNode !== null) {
				path.unshift(currentNode);
				currentNode = prev[currentNode];
			}

			return { distance, path };
		}

		const nodeIndex = notVisited.indexOf(node);
		notVisited.splice(nodeIndex, 1);

		const neighbors = graphNodes.filter(
			(n) =>
				// is connected
				!isNaN(graph.adjacencyDict[node][n]) &&
				// is not visited
				notVisited.includes(n)
		);

		neighbors.forEach((neighbor) => {
			const fullDist = distance + graph.adjacencyDict[node][neighbor];

			if (fullDist < dists[neighbor]) {
				dists[neighbor] = fullDist;
				prev[neighbor] = node;
			}
		})
	}

	return null;
}
