// row label - from; col label - to
// 
// let row = i; let col = j
// m[i][j] = 1; => there is a connection from i to j
// m[i][j] = 0; => there is not a connection from i to j
export type AdjacencyMatrix = number[][];

type Node = number | string;
type GraphType = "undirected" | "directed";

export type Graph<T extends Node> = {
	nodes: T[],
	adjacencyMatrix: AdjacencyMatrix,
	type: GraphType
}

function createAdjacencyMatrixUndirected<T extends Node>(nodes: T[], connections: [T, T][]): AdjacencyMatrix {
	// initialize a 2d n*n list filled with 0 where n is the number of nodes
	const result: AdjacencyMatrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
		result[toIndex][fromIndex] = 1;
		console.log(from, to, result);
	})

	return result;
}

function createAdjacencyMatrixDirected<T extends Node>(nodes: T[], connections: [T, T][]): AdjacencyMatrix {
	// initialize a 2d n*n list filled with 0 where n is the number of nodes
	const result: AdjacencyMatrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
	})

	return result;
}

// connection: [from, to]
export function createGraph<T extends Node>(nodes: T[], connections: [T, T][], type: GraphType): Graph<T> {
	if (new Set(nodes).size !== nodes.length) {
		throw new Error("Nodes must be unique");
	}

	const graph: Graph<T> = {
		nodes,
		adjacencyMatrix: [],
		type
	};

	if (type === "undirected") {
		graph.adjacencyMatrix = createAdjacencyMatrixUndirected(nodes, connections);
	}
	else {
		graph.adjacencyMatrix = createAdjacencyMatrixDirected(nodes, connections);
	}

	return graph;
}
