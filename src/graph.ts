export type Node = number | string;
export type GraphType = "undirected" | "directed";

export type AdjacencyDict = {
	// connection from
	[key in Node]: {
		// connection to
		[key in Node]: number
	}
};

export type Graph = {
	adjacencyDict: AdjacencyDict,
	type: GraphType
};

// all values initialized at zero (no connection)
function createBlankAdjacencyDict(nodes: Node[]): AdjacencyDict {
	// all connections from one to all nodes
	const toConns: AdjacencyDict[Node] = {};
	nodes.forEach((node) => {
		toConns[node] = 0;
	});

	const result: AdjacencyDict = {};
	nodes.forEach((node) => {
		result[node] = { ...toConns };
	});

	return result;
}

function createAdjacencyDictUndirected(nodes: Node[], connections: [Node, Node][]): AdjacencyDict {
	const result: AdjacencyDict = createBlankAdjacencyDict(nodes);

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
		result[toIndex][fromIndex] = 1;
	})

	return result;
}

function createAdjacencyDictDirected(nodes: Node[], connections: [Node, Node][]): AdjacencyDict {
	const result: AdjacencyDict = createBlankAdjacencyDict(nodes);

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
	})

	return result;
}

// connection: [from, to]
export function createGraph<T extends Node>(nodes: T[], connections: [T, T][], type: GraphType): Graph {
	if (new Set(nodes).size !== nodes.length) {
		throw new Error("Nodes must be unique");
	}

	let adjacencyDict = type === "undirected" ?
		createAdjacencyDictUndirected(nodes, connections) :
		createAdjacencyDictDirected(nodes, connections);

	return {
		adjacencyDict,
		type
	};
}

export const testingVars = {
	createBlankAdjacencyDict,
	createAdjacencyDictUndirected,
	createAdjacencyDictDirected
};
