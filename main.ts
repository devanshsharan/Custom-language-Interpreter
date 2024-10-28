import Parser from "./Components/parser.ts";
import { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";

run("./test.txt");

async function run(filename: string) {
	const parser = new Parser();
	const env = createGlobalEnv();

	const input = await Deno.readTextFile(filename);
	const program = parser.produceAST(input);

	evaluate(program, env);
	// console.log(result);
}