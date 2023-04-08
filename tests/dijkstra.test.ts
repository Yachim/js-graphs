import { expect, test } from "@jest/globals";
import { dijkstra } from "../src/dijkstra";
import { createGraph } from "../src/graph";

test("finds shortest path in undirected graph", () => {
	// from createGraph.test.ts
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		["0", "1"],
		["0", "4"],
		["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "3"],
		["3", "4"]
	], "undirected");

	const { distance, path } = dijkstra(graph, "0", "2")!;

	expect(distance).toBe(2);
	expect(path).toEqual(["0", "1", "2"]);
});

test("finds shortest path in undirected graph #2", () => {
	// modified createGraph.test.ts - commented out
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		// ["0", "1"],
		["0", "4"],
		// ["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "3"],
		// ["3", "4"]
	], "undirected");

	const { distance, path } = dijkstra(graph, "0", "2")!;

	expect(distance).toBe(4);
	expect(path).toEqual(["0", "4", "1", "3", "2"]);
});

test("finds shortest path in undirected weighted graph", () => {
	// from createGraph.test.ts
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		["0", "1", 4],
		["0", "4", 9],
		["1", "2", 20],
		["1", "3", 10],
		["1", "4"],
		["2", "3", 1],
		["3", "4", 2]
	], "undirected");

	const { distance, path } = dijkstra(graph, "0", "2")!;

	expect(distance).toBe(8);
	expect(path).toEqual(["0", "1", "4", "3", "2"]);
});

test("finds shortest path in directed graph", () => {
	// modified createGraph.test.ts - commented out
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		["0", "1"],
		["0", "4"],
		["1", "0"],
		// ["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "1"],
		["2", "2"],
		["2", "3"],
		["3", "2"],
		["3", "4"]
	], "directed");

	const { distance, path } = dijkstra(graph, "0", "2")!;

	expect(distance).toBe(3);
	expect(path).toEqual(["0", "1", "3", "2"]);
});

test("finds shortest path in directed weighted graph", () => {
	// from createGraph.test.ts
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		["0", "1", 4],
		["0", "4", 9],
		["1", "0"],
		["1", "2", 20],
		["1", "3", 10],
		["1", "4"],
		["2", "1", 1],
		["2", "2", 10],
		["2", "3", 5],
		["3", "2", 1],
		["3", "4", 2]
	], "directed");

	const { distance, path } = dijkstra(graph, "0", "2")!;

	expect(distance).toBe(15);
	expect(path).toEqual(["0", "1", "3", "2"]);
});

test("does not find shortest path", () => {
	// modified createGraph.test.ts - commented out
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		// ["0", "1"],
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
	], "directed");

	const output = dijkstra(graph, "0", "3");

	expect(output).toBeNull();
});

test("target node is the same as the start node", () => {
	// from createGraph.test.ts
	let graph = createGraph(["0", "1", "2", "3", "4"], [
		["0", "1", 4],
		["0", "4"],
		["1", "2"],
		["1", "3"],
		["1", "4"],
		["2", "3"],
		["3", "4"]
	], "undirected");

	const { distance, path } = dijkstra(graph, "0", "0")!;

	expect(distance).toBe(0);
	expect(path).toEqual(["0"]);
});
