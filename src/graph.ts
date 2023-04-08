export type GraphType = "undirected" | "directed";

export type AdjacencyDict = {
	// connection from
	[key: string]: {
		// connection to
		[key: string]: number
	}
};

export type Graph = {
	adjacencyDict: AdjacencyDict,
	type: GraphType
};

// all values initialized at zero (no connection)
function createBlankAdjacencyDict(nodes: string[]): AdjacencyDict {
	// all connections from one to all nodes
	const toConns: AdjacencyDict[string] = {};
	nodes.forEach((node) => {
		toConns[node] = NaN;
	});

	const result: AdjacencyDict = {};
	nodes.forEach((node) => {
		result[node] = { ...toConns };
	});

	return result;
}

function createAdjacencyDictUndirected(nodes: string[], connections: [string, string][]): AdjacencyDict {
	const result: AdjacencyDict = createBlankAdjacencyDict(nodes);

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
		result[toIndex][fromIndex] = 1;
	})

	return result;
}

function createAdjacencyDictDirected(nodes: string[], connections: [string, string][]): AdjacencyDict {
	const result: AdjacencyDict = createBlankAdjacencyDict(nodes);

	connections.forEach(([from, to]) => {
		const fromIndex = nodes.indexOf(from);
		const toIndex = nodes.indexOf(to);

		result[fromIndex][toIndex] = 1;
	})

	return result;
}

// connection: [from, to]
export function createGraph(nodes: string[], connections: [string, string][], type: GraphType): Graph {
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
