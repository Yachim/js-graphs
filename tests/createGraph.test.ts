import { expect, test } from "@jest/globals";
import { testingVars } from "../src/graph"

let { createAdjacencyDictDirected, createBlankAdjacencyDict, createAdjacencyDictUndirected } = testingVars;

test("creates blank adjacency dict", () => {
	let dict = createBlankAdjacencyDict(["0", "1", "2", "3", "4"]);

	let expected = {
		0: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		},
		1: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		},
		2: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		},
		3: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		},
		4: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		}
	};

	expect(dict).toEqual(expected);
})

// example from https://www.geeksforgeeks.org/graph-and-its-representations/ image
test("creates undirected adjacency dict", () => {
	let dict = createAdjacencyDictUndirected(["0", "1", "2", "3", "4"], [
		["0", "1"],
		["0", "4"],
		["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "3"],
		["3", "4"]
	]);

	let expected = {
		0: {
			0: NaN,
			1: 1,
			2: NaN,
			3: NaN,
			4: 1
		},
		1: {
			0: 1,
			1: NaN,
			2: 1,
			3: 1,
			4: 1
		},
		2: {
			0: NaN,
			1: 1,
			2: NaN,
			3: 1,
			4: NaN
		},
		3: {
			0: NaN,
			1: 1,
			2: 1,
			3: NaN,
			4: 1
		},
		4: {
			0: 1,
			1: 1,
			2: NaN,
			3: 1,
			4: NaN
		}
	};

	expect(dict).toEqual(expected);
})

// modified example from https://www.geeksforgeeks.org/graph-and-its-representations/ image
test("creates directed adjacency dict", () => {
	let dict = createAdjacencyDictDirected(["0", "1", "2", "3", "4"], [
		["0", "1"],
		["0", "4"],
		["1", "0"],
		["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "1"],
		["2", "2"],
		["2", "3"],
		["3", "2"],
		["3", "4"]
	]);

	let expected = {
		0: {
			0: NaN,
			1: 1,
			2: NaN,
			3: NaN,
			4: 1
		},
		1: {
			0: 1,
			1: NaN,
			2: 1,
			3: 1,
			4: 1
		},
		2: {
			0: NaN,
			1: 1,
			2: 1,
			3: 1,
			4: NaN
		},
		3: {
			0: NaN,
			1: NaN,
			2: 1,
			3: NaN,
			4: 1
		},
		4: {
			0: NaN,
			1: NaN,
			2: NaN,
			3: NaN,
			4: NaN
		}
	}

	expect(dict).toEqual(expected);
})
