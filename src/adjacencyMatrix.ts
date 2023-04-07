// row label - from; col label - to
// 
// let row = i; let col = j
// m[i][j] = 1; => there is a connection from i to j
// m[i][j] = 0; => there is not a connection from i to j
export type AdjacencyMatrix = number[][];

function createAdjacencyMatrixUndirected<T extends number | string>(nodes: T[], connections: [T, T][]): AdjacencyMatrix {
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

function createAdjacencyMatrixDirected<T extends number | string>(nodes: T[], connections: [T, T][]): AdjacencyMatrix {
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
export function createAdjacencyMatrix<T extends number | string>(nodes: T[], connections: [T, T][], type: "directed" | "undirected"): AdjacencyMatrix {
	if (new Set(nodes).size !== nodes.length) {
		throw new Error("Nodes must be unique");
	}

	if (type === "undirected") {
		return createAdjacencyMatrixUndirected(nodes, connections);
	}
	else {
		return createAdjacencyMatrixDirected(nodes, connections);
	}
}
