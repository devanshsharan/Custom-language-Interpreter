import Parser from "./Components/parser.ts";
import { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { resetOutput, getOutput } from "./sharedOutput.ts";

export async function runCode(input: string) {
  const parser = new Parser();
  const env = createGlobalEnv();
  resetOutput();

  try {
   
      const program = parser.produceAST(input);
      
      const result = evaluate(program, env);
      console.log(result);
      const output = getOutput(); 
      console.log(output);
        if (output.trim()) {
          console.log(101)
            return `Output:\n${output}`; 
        } else {
          console.log(102)
            return `Output:\n${JSON.stringify(result, null, 2)}`;
        }
  } catch (error) {
    const outputt = getOutput();
    console.log(outputt);
    if (outputt.trim()) {
      console.log(103)
        return `Output:\n${outputt}\nError: ${error.message}`; // Show output before the error
    }
    console.log(104)
    // If no output was accumulated, just show the error
    return `Error: ${error.message}`;
  }
}

