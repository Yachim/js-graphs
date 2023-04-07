import { expect, test } from "@jest/globals";
import { createAdjacencyMatrix } from "../src/adjacencyMatrix";

// example from https://www.geeksforgeeks.org/graph-and-its-representations/ image
test("creates undirected graph matrix", () => {
	let matrix = createAdjacencyMatrix([0, 1, 2, 3, 4], [
		[0, 1],
		[0, 4],
		[1, 2],
		[1, 3],
		[1, 4],
		[2, 3],
		[3, 4]
	], "undirected");
	console.log(matrix);

	let expected = [
		[0, 1, 0, 0, 1],
		[1, 0, 1, 1, 1],
		[0, 1, 0, 1, 0],
		[0, 1, 1, 0, 1],
		[1, 1, 0, 1, 0]
	];

	expect(matrix).toEqual(expected);
})

// modified example from https://www.geeksforgeeks.org/graph-and-its-representations/ image
test("creates directed graph matrix", () => {
	let matrix = createAdjacencyMatrix([0, 1, 2, 3, 4], [
		[0, 1],
		[0, 4],
		[1, 0],
		[1, 2],
		[1, 3],
		[1, 4],
		[2, 1],
		[2, 2],
		[2, 3],
		[3, 2],
		[3, 4]
	], "directed");
	console.log(matrix);

	let expected = [
		[0, 1, 0, 0, 1],
		[1, 0, 1, 1, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 1],
		[0, 0, 0, 0, 0]
	];

	expect(matrix).toEqual(expected);
})
